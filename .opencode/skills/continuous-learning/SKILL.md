---
name: continuous-learning
description: Automatically extract reusable patterns from OpenCode sessions and save them as learned skills for future use.
---

# Continuous Learning Skill

Automatically evaluates OpenCode sessions on end to extract reusable patterns that can be saved as learned skills.

## How It Works

This skill runs as a **session-end hook** via the `evaluate-session` plugin in `.opencode/plugins/lifecycle/evaluate-session.js`:

1. **Session Evaluation**: Checks if session has enough messages
2. **Pattern Detection**: Identifies extractable patterns from the session
3. **Skill Extraction**: Saves useful patterns to `.opencode/skills/learned/`

## Configuration

Configuration is managed in the `evaluate-session` plugin. Pattern types are hardcoded for consistency.

## Pattern Types

| Pattern | Description |
|---------|-------------|
| `error_resolution` | How specific errors were resolved |
| `user_corrections` | Patterns from user corrections |
| `workarounds` | Solutions to framework/library quirks |
| `debugging_techniques` | Effective debugging approaches |
| `project_specific` | Project-specific conventions |

## Hook Setup

Add to your OpenCode plugin configuration:

```json
{
  "hooks": {
    "session-end": [{
      "type": "command",
      "command": "~/.opencode/skills/continuous-learning/evaluate-session.sh"
    }]
  }
}
```

## Why Session-End Hook?

- **Lightweight**: Runs once at session end
- **Non-blocking**: Doesn't add latency to every message
- **Complete context**: Has access to full session transcript

## Related

- [The Longform Guide](https://x.com/affaanmustafa/status/2014040193557471352) - Section on continuous learning
- `/learn` command - Manual pattern extraction mid-session
