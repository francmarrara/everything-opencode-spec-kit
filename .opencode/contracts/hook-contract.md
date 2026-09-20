# Hook Contract: OpenCode Plugin/Hook Format

**Date**: 2026-09-20

## Contract

Every OpenCode hook MUST be implemented as an OpenCode-native plugin.

### Plugin API

Hooks use the `@opencode-ai/plugin` package lifecycle APIs.

### Lifecycle Events

Map Claude Code events to OpenCode equivalents:

| Claude Code Event | OpenCode Equivalent | Notes |
|-------------------|---------------------|-------|
| PreToolUse | TBD | Verify OpenCode event name |
| PostToolUse | TBD | Verify OpenCode event name |
| PreCompact | TBD | Verify OpenCode event name |
| SessionStart | TBD | Verify OpenCode event name |
| SessionEnd | TBD | Verify OpenCode event name |
| Stop | TBD | Verify OpenCode event name |

### Hook Separation

Each independent lifecycle concern MUST be a separate plugin:

- lifecycle (session start/end)
- git-safeguards (push review, branch protection)
- formatting (auto-format on edit)
- verification (type check, lint on edit)
- memory-session (state persistence)
- logging (console.log detection)

### Prohibited

- `${CLAUDE_PLUGIN_ROOT}` references
- Claude Code stdin/stdout JSON protocol (unless OpenCode uses same)
- Monolithic hook implementations (unless documented justification)

### Validation

- MUST use OpenCode-native plugin API
- MUST have explicit triggering conditions
- MUST NOT have surprising side effects
- SHOULD have automated tests
