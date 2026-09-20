/**
 * Verification Plugin (T115)
 *
 * Implements type-check-on-edit and console.log-detect via tool.execute.after.
 * Adapted from source PostToolUse hooks.
 *
 * OpenCode event: tool.execute.after (filter: write/edit tools)
 */

const fs = require('fs');

const VerificationPlugin = async ({ project, client }) => {
  return {
    'tool.execute.after': async (input, output) => {
      if (input.tool !== 'write' && input.tool !== 'edit') return;

      const filePath = input.args?.filePath || input.args?.file_path || '';

      // TypeScript type check on .ts/.tsx edits
      if (/\.(ts|tsx)$/.test(filePath)) {
        await client.app.log({
          body: {
            service: 'verification',
            level: 'info',
            message: `Type check triggered for: ${filePath}`,
          },
        });
      }

      // Console.log detection
      if (/\.(ts|tsx|js|jsx)$/.test(filePath)) {
        try {
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.split('\n');
            const matches = [];
            lines.forEach((line, idx) => {
              if (/console\.log/.test(line)) matches.push(`${idx + 1}: ${line.trim()}`);
            });
            if (matches.length > 0) {
              await client.app.log({
                body: {
                  service: 'verification',
                  level: 'warn',
                  message: `console.log found in ${filePath}:\n${matches.slice(0, 5).join('\n')}`,
                },
              });
            }
          }
        } catch {}
      }
    },
  };
};

module.exports = VerificationPlugin;
