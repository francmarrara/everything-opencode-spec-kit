/**
 * Git Safeguards Plugin (T113)
 *
 * Implements git push review and dev-server-block via tool.execute.before.
 * Adapted from source hooks.json PreToolUse hooks.
 *
 * OpenCode event: tool.execute.before (filter: bash tool)
 *
 * Note: OpenCode plugin API cannot block tool execution.
 * Warnings are logged via client.app.log() instead.
 */

const GitSafeguardsPlugin = async ({ project, client }) => {
  return {
    'tool.execute.before': async (input, output) => {
      if (input.tool !== 'bash') return;

      const cmd = output.args?.command || '';

      // Warn about dev servers outside tmux
      if (/(npm run dev|pnpm( run)? dev|yarn dev|bun run dev)/.test(cmd)) {
        if (!process.env.TMUX) {
          await client.app.log({
            body: {
              service: 'git-safeguards',
              level: 'warn',
              message: 'BLOCKED: Dev server must run in tmux for log access. Use: tmux new-session -d -s dev "npm run dev"',
            },
          });
        }
      }

      // Reminder about tmux for long-running commands
      if (/(npm (install|test)|pnpm (install|test)|yarn (install|test)?|bun (install|test)|cargo build|make|docker|pytest|vitest|playwright)/.test(cmd)) {
        if (!process.env.TMUX) {
          await client.app.log({
            body: {
              service: 'git-safeguards',
              level: 'info',
              message: 'Consider running in tmux for session persistence: tmux new -s dev',
            },
          });
        }
      }

      // Review before git push
      if (cmd.includes('git push')) {
        await client.app.log({
          body: {
            service: 'git-safeguards',
            level: 'info',
            message: 'Review changes before push...',
          },
        });
      }
    },
  };
};

module.exports = GitSafeguardsPlugin;
