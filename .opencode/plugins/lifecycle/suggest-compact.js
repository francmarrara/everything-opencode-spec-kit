/**
 * Suggest Compact Lifecycle Plugin (T111)
 *
 * Adapted from: scripts/hooks/suggest-compact.js
 * Upstream provenance: everything-claude-code (MIT License)
 *
 * Suggests manual compaction at strategic workflow points.
 * OpenCode event: tool.execute.before (tracks tool calls)
 */

const SUGGEST_THRESHOLD = 50;
const REMIND_INTERVAL = 25;

const SuggestCompactPlugin = async ({ project, client }) => {
  let toolCallCount = 0;
  let suggested = false;

  return {
    'tool.execute.before': async (input, output) => {
      toolCallCount++;

      if (toolCallCount >= SUGGEST_THRESHOLD && !suggested) {
        suggested = true;
        await client.app.log({
          body: {
            service: 'suggest-compact',
            level: 'info',
            message: `Consider compacting context (${toolCallCount} tool calls). Use /compact or switch to Plan mode to summarize progress.`,
          },
        });
      } else if (suggested && toolCallCount % REMIND_INTERVAL === 0) {
        await client.app.log({
          body: {
            service: 'suggest-compact',
            level: 'info',
            message: `${toolCallCount} tool calls total. Context may benefit from compaction.`,
          },
        });
      }
    },
  };
};

module.exports = SuggestCompactPlugin;
