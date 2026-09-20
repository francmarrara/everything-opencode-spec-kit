/**
 * Pre-Compact Lifecycle Plugin (T110)
 *
 * Adapted from: scripts/hooks/pre-compact.js
 * Upstream provenance: everything-claude-code (MIT License)
 *
 * Handles pre-compaction lifecycle events.
 * OpenCode event: experimental.session.compacting
 */

const PreCompactPlugin = async ({ project, client }) => {
  return {
    'experimental.session.compacting': async (input, output) => {
      output.context.push('## Session State\nPreserve current task status and important decisions across compaction.');

      await client.app.log({
        body: {
          service: 'pre-compact',
          level: 'info',
          message: `Compaction triggered for session ${input.sessionID}`,
        },
      });
    },
  };
};

module.exports = PreCompactPlugin;
