# Command Contract: OpenCode Command Format

**Date**: 2026-09-20

## Contract

Every OpenCode command MUST conform to this format.

### Structure

Commands are Markdown files in `.opencode/commands/<command-name>.md`.

### Required Fields

```yaml
---
description: <string>   # What the command does
---
```

### Prohibited Fields

- `disable-model-invocation` (Claude Code-specific)

### Content

After the YAML frontmatter, the Markdown body contains the command instructions.

### Prohibited Content

- References to `~/.claude/` paths
- References to Claude Code-specific frontmatter keys
- Spec Kit command duplication (e.g., planning, specifying)

### Argument Substitution

- `$ARGUMENTS` -> User-provided arguments (verify OpenCode uses same pattern)

### Validation

- name MUST NOT duplicate Spec Kit commands
- MUST reference existing agents in `.opencode/agents/`
- MUST NOT reference Claude Code-specific paths
