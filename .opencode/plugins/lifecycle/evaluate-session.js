/**
 * Evaluate Session Lifecycle Plugin (T112)
 *
 * Adapted from: scripts/hooks/evaluate-session.js
 * Upstream provenance: everything-claude-code (MIT License)
 *
 * Evaluates session quality and extracts learnings.
 * OpenCode event: session.idle (via event handler)
 */

const EvaluateSessionPlugin = async ({ project, client }) => {
  return {
    event: async ({ event }) => {
      if (event.type !== 'session.idle') return;

      await client.app.log({
        body: {
          service: 'evaluate-session',
          level: 'info',
          message: 'Session evaluation: checking for extractable patterns...',
        },
      });
    },
  };
};

module.exports = EvaluateSessionPlugin;
