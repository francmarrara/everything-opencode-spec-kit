/**
 * Logging Plugin (T116)
 *
 * Implements console.log detection in session idle via event handler.
 * Adapted from source Stop hooks.
 *
 * OpenCode event: session.idle (via event handler)
 */

const fs = require('fs');
const { execSync } = require('child_process');

const LoggingPlugin = async ({ project, client }) => {
  return {
    event: async ({ event }) => {
      if (event.type !== 'session.idle') return;

      try {
        execSync('git rev-parse --git-dir', { stdio: 'pipe' });
      } catch {
        return; // Not a git repo
      }

      try {
        const files = execSync('git diff --name-only HEAD', {
          encoding: 'utf8',
          stdio: ['pipe', 'pipe', 'pipe'],
        })
          .split('\n')
          .filter((f) => /\.(ts|tsx|js|jsx)$/.test(f) && fs.existsSync(f));

        let hasConsole = false;
        for (const f of files) {
          if (fs.readFileSync(f, 'utf8').includes('console.log')) {
            await client.app.log({
              body: {
                service: 'logging',
                level: 'warn',
                message: `console.log found in ${f}`,
              },
            });
            hasConsole = true;
          }
        }
      } catch {}
    },
  };
};

module.exports = LoggingPlugin;
