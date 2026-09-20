# Skill Contract: OpenCode Skill Format

**Date**: 2026-09-20

## Contract

Every OpenCode skill MUST conform to this format.

### Structure

Skills are Markdown files in `.opencode/skills/<skill-name>/SKILL.md`.

### Required Content

- Clear description of what the skill provides
- Step-by-step procedures or domain knowledge
- References to tools or resources (if any)

### Prohibited Content

- Claude Code-specific file paths (e.g., `~/.claude/`)
- Claude Code-specific environment variables (e.g., `CLAUDE_*`)
- Claude Code-specific hook events (e.g., PreToolUse, Stop)
- Claude Code-specific commands (e.g., `/compact`)
- References to Claude Code identity (e.g., "You are Claude Code")

### Validation

- MUST be self-contained or explicitly declare dependencies
- MUST NOT assume specific runtime tools unless documented
- MUST NOT overlap with Constitution or spec responsibilities
