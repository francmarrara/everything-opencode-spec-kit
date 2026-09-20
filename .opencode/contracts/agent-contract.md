# Agent Contract: OpenCode Agent Definition Format

**Date**: 2026-09-20

## Contract

Every OpenCode agent MUST conform to this definition format.

### Required Fields

```yaml
---
name: <string>          # Unique agent identifier
description: <string>   # Human-readable role description
tools: <list[string]>   # Tool access permissions (least-privilege)
---
```

### Optional Fields

```yaml
model: <string>         # Model preference (if OpenCode supports)
```

### System Instructions

After the YAML frontmatter, the Markdown body contains the agent's system instructions.

### Validation

- name MUST be unique across all agents
- tools MUST only contain OpenCode-verified tool names
- system instructions MUST NOT reference Claude Code-specific mechanisms
- permissions MUST follow least-privilege principle (Constitution Principle IX)

### Tool Name Mapping

| Claude Code | OpenCode | Notes |
|-------------|----------|-------|
| Read | Read | File reading |
| Write | Write | File writing |
| Edit | Edit | File editing |
| Bash | Bash | Shell execution (privileged) |
| Grep | Grep | Content search |
| Glob | Glob | File pattern matching |
| Task | Task | Agent delegation |
| TodoWrite | TBD | Progress tracking (verify availability) |
| WebSearch | WebSearch | Web search (verify availability) |
| WebFetch | WebFetch | Web fetch (verify availability) |

### Example

```yaml
---
name: tdd-guide
description: Test-Driven Development specialist enforcing write-tests-first methodology.
tools: Read, Write, Edit, Bash, Grep
---

You are a Test-Driven Development specialist...
```
