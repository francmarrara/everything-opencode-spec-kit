# Everything OpenCode + Spec Kit

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
![Markdown](https://img.shields.io/badge/-Markdown-000000?logo=markdown&logoColor=white)

**A reusable, native OpenCode + GitHub Spec Kit framework for AI-assisted software development.**

Migrated from [everything-claude-code](https://github.com/affaan-m/everything-claude-code) with all Claude Code-specific dependencies replaced by OpenCode-native equivalents.

---

## What This Is

This framework provides:

- **8 specialized agents** with least-privilege permissions
- **14 operational commands** for TDD, verification, code review, security review, and more
- **12 skills** covering backend/frontend patterns, coding standards, TDD workflow, and security
- **5 plugins** implementing lifecycle hooks, git safeguards, formatting, verification, and logging
- **15 MCP server configurations** with environment-backed credentials (default: disabled)
- **98 automated tests** covering behavioral, integration, and unit levels

All components follow the [Constitution](.specify/memory/constitution.md) and are governed by the Spec Kit workflow.

---

## Architecture

```
.specify/                  # Spec Kit layer (governance)
├── memory/
│   └── constitution.md    # 17 principles, non-negotiable
├── templates/
├── scripts/
└── workflows/

.opencode/                 # OpenCode layer (runtime)
├── agents/                # Specialized autonomous units
├── commands/              # Operational slash commands
├── skills/                # Reusable knowledge and procedures
├── instructions/          # Runtime instructions (migrated from rules)
├── plugins/               # OpenCode-native lifecycle extensions
│   ├── lifecycle/
│   ├── git-safeguards/
│   ├── formatting/
│   ├── verification/
│   ├── memory-session/
│   └── logging/
├── contracts/             # Component format specifications
├── lib/                   # Shared utilities
├── mcp/servers/           # MCP server configurations
└── tests/                 # Automated test suite
    ├── behavioral/
    ├── integration/
    └── unit/
```

---

## Quick Start

### Prerequisites

- OpenCode installed and configured
- Node.js 18+
- Git

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd everything-opencode-spec-kit

# Verify installation
node .opencode/tests/run-all.js
```

### Verify Zero Claude Code References

```bash
grep -r "CLAUDE_" .opencode/ || echo "PASS: No CLAUDE_ references"
grep -r "~/.claude" .opencode/ || echo "PASS: No ~/.claude references"
grep -r "claude-plugin" .opencode/ || echo "PASS: No claude-plugin references"
```

---

## Agents

| Agent | Tools | Role |
|-------|-------|------|
| architect | Read, Grep, Glob | System design (read-only) |
| build-error-resolver | Read, Write, Edit, Bash, Grep, Glob | Fix build errors |
| code-reviewer | Read, Grep, Glob, Bash | Code quality review (read-only) |
| doc-updater | Read, Write, Edit, Bash, Grep, Glob | Documentation maintenance |
| e2e-runner | Read, Write, Edit, Bash, Grep, Glob | Playwright E2E testing |
| refactor-cleaner | Read, Write, Edit, Bash, Grep, Glob | Dead code cleanup |
| security-reviewer | Read, Write, Edit, Bash, Grep, Glob | Vulnerability analysis |
| tdd-guide | Read, Write, Edit, Bash, Grep | Test-driven development |

See [agents/README.md](.opencode/agents/README.md) for full permission justifications.

---

## Commands

| Command | Description |
|---------|-------------|
| `/tdd` | Test-driven development workflow |
| `/verify` | Comprehensive verification (build, types, lint, tests, security) |
| `/code-review` | Security and quality review |
| `/e2e` | End-to-end test generation with Playwright |
| `/build-fix` | Incremental build error fixing |
| `/orchestrate` | Multi-agent workflow coordination |
| `/learn` | Pattern extraction from sessions |
| `/checkpoint` | Workflow state snapshots |
| `/eval` | Eval-driven development |
| `/refactor-clean` | Dead code removal |
| `/test-coverage` | Coverage analysis |
| `/update-docs` | Documentation sync |
| `/update-codemaps` | Code map updates |
| `/setup-pm` | Configure package manager |

---

## Skills

| Skill | Purpose |
|-------|---------|
| backend-patterns | API, database, caching patterns |
| clickhouse-io | ClickHouse integration |
| coding-standards | Language best practices |
| continuous-learning | Auto-extract patterns from sessions |
| eval-harness | Verification loop evaluation |
| frontend-patterns | React, Next.js patterns |
| project-guidelines-example | Template for project rules |
| security-review | Security checklist |
| strategic-compact | Context compaction suggestions |
| tdd-workflow | TDD methodology |
| verification-loop | Continuous verification |
| mcp-configs | MCP server management |

---

## Spec Kit Integration

This framework follows the Spec Kit lifecycle:

```
Constitution → Specify → Clarify → Plan → Tasks → Implement → Analyze → Converge
```

### Available Spec Kit Commands

| Command | Purpose |
|---------|---------|
| `/speckit.constitution` | Ratify or amend project constitution |
| `/speckit.specify` | Create feature specification |
| `/speckit.clarify` | Resolve ambiguities in spec |
| `/speckit.plan` | Generate implementation plan |
| `/speckit.tasks` | Decompose into executable tasks |
| `/speckit.analyze` | Check consistency across artifacts |
| `/speckit.converge` | Verify implementation matches spec |

### Separation Rule

Spec Kit defines **WHAT** (requirements, architecture). OpenCode defines **HOW** (implementation, testing, review). The framework MUST NOT duplicate Spec Kit functionality inside OpenCode components.

---

## MCP Integrations

15 MCP servers configured with environment-backed credentials:

| Server | Type | Purpose |
|--------|------|---------|
| github | stdio | GitHub operations |
| firecrawl | stdio | Web scraping |
| supabase | stdio | Database operations |
| memory | stdio | Persistent memory |
| sequential-thinking | stdio | Chain-of-thought reasoning |
| vercel | http | Vercel deployments |
| railway | stdio | Railway deployments |
| cloudflare-docs | http | Cloudflare docs |
| cloudflare-workers-builds | http | Workers builds |
| cloudflare-workers-bindings | http | Workers bindings |
| cloudflare-observability | http | Observability |
| clickhouse | http | Analytics queries |
| context7 | stdio | Live documentation |
| magic | stdio | UI components |
| filesystem | stdio | Filesystem operations |

All servers default to `enabled: false`. Enable only what you need.

---

## Testing

```bash
# Run all 98 tests
node .opencode/tests/run-all.js

# Run specific test categories
node .opencode/tests/behavioral/tdd-workflow.test.js
node .opencode/tests/integration/mcp-config.test.js
node .opencode/tests/unit/utils.test.js
```

---

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

When adding components:
1. Follow the Constitution principles
2. Add automated tests
3. Document permission justifications (for agents)
4. Run the full test suite before submitting

---

## Upstream Provenance

This project incorporates components from [everything-claude-code](https://github.com/affaan-m/everything-claude-code) by Affaan Mustafa, licensed under MIT.

---

## License

MIT - See [LICENSE](LICENSE) for details.
