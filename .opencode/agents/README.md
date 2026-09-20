# OpenCode Agents

Permission justifications per Constitution Principle IX (Least-Privilege Agents).

## Agent Permissions

| Agent | Tools | Justification |
|-------|-------|---------------|
| architect | Read, Grep, Glob | Read-only analysis agent. Needs file reading and search to analyze codebases and produce architectural recommendations. No write access needed. |
| build-error-resolver | Read, Write, Edit, Bash, Grep, Glob | Must read error output, edit source files to fix build errors, run build commands, and search for related code. All tools required for iterative fix cycle. |
| code-reviewer | Read, Grep, Glob, Bash | Read-only review agent. Needs file reading, search, and limited Bash (for git diff). No write access — reviews only. |
| doc-updater | Read, Write, Edit, Bash, Grep, Glob | Must read existing docs, write new documentation, edit outdated content, and run doc generation tools. Full access required. |
| e2e-runner | Read, Write, Edit, Bash, Grep, Glob | Must read test specs, write/edit test files, run Playwright, and search for test targets. Full access for E2E workflow. |
| refactor-cleaner | Read, Write, Edit, Bash, Grep, Glob | Must read code, refactor (edit/write), run linters/formatters, and search for patterns. Full access for refactoring. |
| security-reviewer | Read, Write, Edit, Bash, Grep, Glob | Must read code, run security scans (Bash), search for vulnerabilities (Grep/Glob), and potentially write security fixes. Full access justified by security scope. |
| tdd-guide | Read, Write, Edit, Bash, Grep | Must read requirements, write tests, edit implementation, run test suites, and search for related code. No Glob needed — targeted search via Grep suffices. |

## Permission Principles

1. **Read-only agents** (architect, code-reviewer) never have Write/Edit/Bash-write capabilities
2. **Write-capable agents** have explicit justification for each write tool
3. **Bash access** is only granted when the agent must execute build, test, or scan commands
4. **No agent has more tools than required** for its documented responsibility

## Adding New Agents

When adding a new agent:
1. Document the minimum tools required
2. Justify each tool in this README
3. Verify against Constitution Principle IX
4. Run `node .opencode/tests/behavioral/agent-permissions.test.js` to validate
