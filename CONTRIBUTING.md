# Contributing to Everything OpenCode + Spec Kit

Thanks for wanting to contribute. This repo is a reusable framework for AI-assisted software development using OpenCode + GitHub Spec Kit.

## What We're Looking For

### Agents

New agents that handle specific tasks well (place in `.opencode/agents/`):
- Language-specific reviewers (Python, Go, Rust)
- Framework experts (Django, Rails, Laravel, Spring)
- DevOps specialists (Kubernetes, Terraform, CI/CD)
- Domain experts (ML pipelines, data engineering, mobile)

### Skills

Workflow definitions and domain knowledge (place in `.opencode/skills/`):
- Language best practices
- Framework patterns
- Testing strategies
- Architecture guides
- Domain-specific knowledge

### Commands

Slash commands that invoke useful workflows (place in `.opencode/commands/`):
- Deployment commands
- Testing commands
- Documentation commands
- Code generation commands

### Plugins

OpenCode-native lifecycle extensions (place in `.opencode/plugins/`):
- Formatting hooks
- Security checks
- Validation hooks
- Notification hooks

### Instructions

Runtime instructions (place in `.opencode/instructions/`):
- Security rules
- Code style rules
- Testing requirements
- Naming conventions

### MCP Configurations

New or improved MCP server configs (place in `.opencode/mcp/servers/`):
- Database integrations
- Cloud provider MCPs
- Monitoring tools
- Communication tools

---

## How to Contribute

### 1. Fork the repo

```bash
git clone https://github.com/YOUR_USERNAME/everything-opencode-spec-kit.git
cd everything-opencode-spec-kit
```

### 2. Create a branch

```bash
git checkout -b add-python-reviewer
```

### 3. Add your contribution

Place files in the appropriate directory under `.opencode/`:
- `agents/` for new agents
- `skills/` for skills (single .md or directory with SKILL.md)
- `commands/` for slash commands
- `instructions/` for instruction files
- `plugins/` for lifecycle plugins (with index.js)
- `mcp/servers/` for MCP server configs

### 4. Follow the format

**Agents** should have frontmatter:

```markdown
---
description: What it does
mode: subagent
permission:
  read: allow
  grep: allow
  glob: allow
  bash: deny
---

Instructions here...
```

**Skills** should be clear and actionable:

```markdown
# Skill Name

## When to Use

...

## How It Works

...

## Examples

...
```

**Commands** should explain what they do:

```markdown
---
description: Brief description of command
---

# Command Name

Detailed instructions...
```

**Plugins** should follow the OpenCode plugin API:

```javascript
module.exports = {
  name: 'plugin-name',
  hooks: [
    { event: 'tool.execute.after', handler: async (ctx) => { ... } }
  ]
};
```

### 5. Test your contribution

```bash
# Run the full test suite
node .opencode/tests/run-all.js
```

### 6. Submit a PR

```bash
git add .
git commit -m "Add Python code reviewer agent"
git push origin add-python-reviewer
```

Then open a PR with:
- What you added
- Why it's useful
- How you tested it

---

## Guidelines

### Do

- Keep configs focused and modular
- Include clear descriptions
- Test before submitting
- Follow existing patterns
- Document any dependencies

### Don't

- Include sensitive data (API keys, tokens, paths)
- Add overly complex or niche configs
- Submit untested configs
- Create duplicate functionality
- Add configs that require specific paid services without alternatives

---

## File Naming

- Use lowercase with hyphens: `python-reviewer.md`
- Be descriptive: `tdd-workflow.md` not `workflow.md`
- Match the agent/skill name to the filename

---

## Constitution

All contributions must follow the [Constitution](.specify/memory/constitution.md) principles. Review it before submitting.

---

Thanks for contributing. Let's build a great resource together.
