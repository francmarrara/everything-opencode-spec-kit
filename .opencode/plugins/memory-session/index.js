/**
 * Memory/Session Plugin for OpenCode
 *
 * Provides session state persistence and context loading.
 * Learned information is non-authoritative and never overrides
 * the Constitution or specifications.
 *
 * OpenCode events: session.created (start), session.idle (end)
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

function getSessionsDir() {
  return path.join(os.homedir(), '.opencode', 'sessions');
}

function getLearnedSkillsDir() {
  return path.join(os.homedir(), '.opencode', 'skills', 'learned');
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function findFiles(dir, pattern, options = {}) {
  const { maxAge = null } = options;
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const regex = new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');

  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isFile() && regex.test(entry.name)) {
        const fullPath = path.join(dir, entry.name);
        if (maxAge !== null) {
          const stats = fs.statSync(fullPath);
          const ageInDays = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60 * 24);
          if (ageInDays <= maxAge) results.push({ path: fullPath, mtime: stats.mtimeMs });
        } else {
          results.push({ path: fullPath, mtime: fs.statSync(fullPath).mtimeMs });
        }
      }
    }
  } catch {}

  results.sort((a, b) => b.mtime - a.mtime);
  return results;
}

const MemorySessionPlugin = async ({ project, client }) => {
  return {
    event: async ({ event }) => {
      if (event.type === 'session.created') {
        const sessionsDir = getSessionsDir();
        const learnedDir = getLearnedSkillsDir();

        ensureDir(sessionsDir);
        ensureDir(learnedDir);

        const recentSessions = findFiles(sessionsDir, '*.tmp', { maxAge: 7 });
        if (recentSessions.length > 0) {
          await client.app.log({ body: { service: 'memory-session', level: 'info', message: `Found ${recentSessions.length} recent session(s)` } });
        }

        const learnedSkills = findFiles(learnedDir, '*.md');
        if (learnedSkills.length > 0) {
          await client.app.log({ body: { service: 'memory-session', level: 'info', message: `${learnedSkills.length} learned skill(s) available` } });
        }
      }

      if (event.type === 'session.idle') {
        const sessionsDir = getSessionsDir();
        const today = new Date().toISOString().split('T')[0];
        const sessionFile = path.join(sessionsDir, `${today}-session.tmp`);

        ensureDir(sessionsDir);

        const currentTime = new Date().toTimeString().split(' ')[0];

        if (fs.existsSync(sessionFile)) {
          let content = fs.readFileSync(sessionFile, 'utf8');
          content = content.replace(/\*\*Last Updated:\*\*.*/, `**Last Updated:** ${currentTime}`);
          fs.writeFileSync(sessionFile, content);
        } else {
          const template = `# Session: ${today}
**Date:** ${today}
**Started:** ${currentTime}
**Last Updated:** ${currentTime}

---

## Current State

[Session context goes here]

### Completed
- [ ]

### In Progress
- [ ]

### Notes for Next Session
-

### Context to Load
\`\`\`
[relevant files]
\`\`\`
`;
          fs.writeFileSync(sessionFile, template);
        }

        await client.app.log({ body: { service: 'memory-session', level: 'info', message: `Session state persisted: ${sessionFile}` } });
      }
    },
  };
};

module.exports = MemorySessionPlugin;
