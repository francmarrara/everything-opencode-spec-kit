# Research: OpenCode + Spec Kit Framework Migration

**Date**: 2026-09-20
**Feature**: 001-opencode-framework-migration

## Research Tasks

### R1: OpenCode Agent Definition Format

**Decision**: OpenCode agents use Markdown files with YAML frontmatter in `.opencode/agents/`.

**Rationale**: The existing `.opencode/commands/` directory already exists in the project, confirming OpenCode supports Markdown-based configuration. Agent definitions follow the same pattern as the source Claude Code agents (Markdown + frontmatter), making migration straightforward.

**Alternatives considered**:
- JSON agent definitions: Rejected; Markdown is more readable and maintainable for agent instructions.
- TypeScript-based agents: Rejected; adds unnecessary complexity for declarative agent definitions.

**Claude Code assumptions to replace**:
- `tools:` frontmatter key -> Verify OpenCode uses same key or map to equivalent
- `model:` frontmatter key -> Verify OpenCode supports model selection or use default
- Tool names (Read, Write, Edit, Bash, Grep, Glob) -> Map to OpenCode tool names

### R2: OpenCode Hook/Plugin API

**Decision**: OpenCode plugins use the `@opencode-ai/plugin` package with lifecycle hooks.

**Rationale**: The `.opencode/package.json` already depends on `@opencode-ai/plugin` version 1.18.31, confirming plugin support exists. OpenCode plugins implement lifecycle behavior through this package's API.

**Alternatives considered**:
- Shell-script-only hooks: Rejected; not testable and not OpenCode-native.
- Mixed plugin + shell approach: Only acceptable when documented justification exists (Constitution Principle X).

**Claude Code assumptions to replace**:
- Hook event types (PreToolUse, PostToolUse, PreCompact, SessionStart, SessionEnd, Stop) -> Map to OpenCode plugin lifecycle events
- Matcher syntax (`tool == "Bash" && tool_input.command matches "..."`) -> Map to OpenCode hook filtering
- stdin/stdout JSON protocol (`tool_input`, `tool_output`) -> Map to OpenCode hook data format
- `${CLAUDE_PLUGIN_ROOT}` env var -> Use OpenCode plugin root resolution
- `process.exit(1)` to block tool calls -> Verify OpenCode equivalent mechanism

### R3: OpenCode Skill Format

**Decision**: Skills are Markdown files in `.opencode/skills/` directories.

**Rationale**: Skills are reusable knowledge/procedures. The Markdown format is portable; the key adaptation is removing Claude Code-specific references within the content.

**Alternatives considered**:
- JSON-based skill definitions: Rejected; less readable for domain knowledge content.
- Code-based skill implementations: Rejected; skills should be declarative knowledge.

**Claude Code assumptions to replace**:
- References to `~/.claude/skills/learned/` -> OpenCode learned skills path
- References to Claude Code hook events -> OpenCode equivalent events
- References to `/compact` command -> OpenCode equivalent or remove

### R4: OpenCode Command Format

**Decision**: Commands are Markdown files in `.opencode/commands/` with frontmatter.

**Rationale**: The `.opencode/commands/` directory already exists, confirming the format.

**Alternatives considered**:
- TypeScript command implementations: Rejected; Markdown is sufficient for declarative commands.

**Claude Code assumptions to replace**:
- `$ARGUMENTS` variable substitution -> Verify OpenCode uses same pattern
- `disable-model-invocation` frontmatter -> Verify OpenCode equivalent or remove
- Agent reference paths (`~/.claude/agents/`) -> Update to `.opencode/agents/`

### R5: OpenCode MCP Configuration

**Decision**: MCP servers are configured in OpenCode's native configuration format with environment-backed credentials.

**Rationale**: Constitution Principle XI requires environment-backed secrets and default-to-disabled.

**Alternatives considered**:
- Direct embedding in settings: Rejected; violates security-by-default principle.

**Claude Code assumptions to replace**:
- `~/.claude.json` mcpServers section -> OpenCode MCP config location
- `disabledMcpServers` array -> OpenCode enable/disable mechanism
- Hardcoded placeholder credentials (`YOUR_*_HERE`) -> Environment variable references

### R6: OpenCode File System Conventions

**Decision**: Runtime components live under `.opencode/`; governance under `.specify/`.

**Rationale**: Constitution Additional Constraints section mandates this separation.

**Claude Code assumptions to replace**:
- `~/.claude/` -> `~/.opencode/` or OpenCode equivalent
- `.claude/` project directory -> `.opencode/` project directory
- `CLAUDE.md` -> OpenCode documentation convention
- `.claude-plugin/` -> Remove; OpenCode uses different plugin format
- `~/.claude/plugins/` -> OpenCode plugin installation path

### R7: OpenCode Tool Names

**Decision**: Map Claude Code tool names to OpenCode equivalents.

**Research needed**: The exact OpenCode tool names must be verified against the OpenCode documentation. The following mapping is preliminary:

| Claude Code Tool | OpenCode Equivalent | Confidence |
|-----------------|---------------------|------------|
| Read | Read | High (likely same) |
| Write | Write | High (likely same) |
| Edit | Edit | High (likely same) |
| Bash | Bash or Shell | Medium (verify name) |
| Grep | Grep | High (likely same) |
| Glob | Glob | High (likely same) |
| Task | Task | Medium (verify name) |
| TodoWrite | TodoWrite or equivalent | Low (verify existence) |
| WebSearch | WebSearch | Medium (verify name) |
| WebFetch | WebFetch | Medium (verify name) |

### R8: Continuous Learning Redesign

**Decision**: Redesign continuous-learning skill to use OpenCode-compatible session mechanisms.

**Rationale**: The skill depends on `CLAUDE_TRANSCRIPT_PATH` (JSONL transcript format) and `Stop` hook event. OpenCode may have different session persistence mechanisms.

**Alternatives considered**:
- Use OpenCode session logs if available
- Use file-based pattern extraction independent of transcript format
- Defer to manual learning (remove automation)

### R9: Strategic Compact Redesign

**Decision**: Redesign strategic-compact skill to use OpenCode-compatible tool counting and compaction mechanisms.

**Rationale**: The skill depends on `CLAUDE_SESSION_ID`, `PreToolUse` hook, and `/compact` command. OpenCode may handle compaction differently.

**Alternatives considered**:
- Use OpenCode's built-in compaction if available
- Implement file-based tool counting independent of session APIs
- Simplify to manual compaction suggestions

### R10: Test Infrastructure Adaptation

**Decision**: Adapt existing Node.js test runner for OpenCode framework testing.

**Rationale**: The existing `tests/run-all.js` and test files provide a foundation. Tests must be updated to validate OpenCode-native behavior.

**Claude Code assumptions to replace**:
- `CLAUDE_SESSION_ID` in test assertions -> OpenCode session mechanism
- `CLAUDE_TRANSCRIPT_PATH` in test assertions -> OpenCode session mechanism
- Claude Code hook event type validation -> OpenCode hook event validation
- `~/.claude/sessions/` directory paths -> OpenCode paths
