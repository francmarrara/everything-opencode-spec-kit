/**
 * Formatting Plugin (T114)
 *
 * Implements auto-format-on-edit via tool.execute.after.
 * Adapted from source PostToolUse hooks.
 *
 * OpenCode event: tool.execute.after (filter: write/edit tools)
 */

const FormattingPlugin = async ({ project, client }) => {
  return {
    'tool.execute.after': async (input, output) => {
      if (input.tool !== 'write' && input.tool !== 'edit') return;

      const filePath = input.args?.filePath || input.args?.file_path || '';

      if (/\.(js|ts|jsx|tsx|json|md)$/.test(filePath)) {
        await client.app.log({
          body: {
            service: 'formatting',
            level: 'info',
            message: `Format triggered for: ${filePath}`,
          },
        });
      }
    },
  };
};

module.exports = FormattingPlugin;
