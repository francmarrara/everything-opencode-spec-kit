# Quickstart Validation Guide: OpenCode + Spec Kit Framework Migration

**Date**: 2026-09-20
**Feature**: 001-opencode-framework-migration

## Prerequisites

- OpenCode installed and configured
- Node.js 18+ available
- Git repository cloned

## Validation Scenarios

### VS-01: Framework Installation

**Goal**: Verify all components are discoverable after migration.

```bash
# 1. Verify agent directory exists and contains all 8 agents
ls .opencode/agents/
# Expected: architect.md build-error-resolver.md code-reviewer.md doc-updater.md
#           e2e-runner.md refactor-cleaner.md security-reviewer.md tdd-guide.md

# 2. Verify command directory exists and contains operational commands
ls .opencode/commands/
# Expected: build-fix.md checkpoint.md code-review.md e2e.md eval.md learn.md
#           orchestrate.md refactor-clean.md setup-pm.md tdd.md test-coverage.md
#           update-codemaps.md update-docs.md verify.md

# 3. Verify skill directories exist
ls .opencode/skills/
# Expected: backend-patterns/ clickhouse-io/ coding-standards/ continuous-learning/
#           eval-harness/ frontend-patterns/ project-guidelines-example/
#           security-review/ strategic-compact/ tdd-workflow/ verification-loop/

# 4. Verify no Claude Code references remain
grep -r "CLAUDE_" .opencode/ || echo "PASS: No CLAUDE_ references"
grep -r "~/.claude" .opencode/ || echo "PASS: No ~/.claude references"
grep -r "claude-plugin" .opencode/ || echo "PASS: No claude-plugin references"
```

**Expected Outcome**: All directories exist; zero Claude Code references.

### VS-02: Agent Permission Validation

**Goal**: Verify agents have least-privilege permissions.

```bash
# Check each agent's tools list
for agent in .opencode/agents/*.md; do
  echo "=== $(basename $agent) ==="
  head -10 "$agent" | grep "tools:"
done
```

**Expected Outcome**: Each agent lists only required tools; no agent has unnecessary write access.

### VS-03: MCP Security Validation

**Goal**: Verify no hardcoded credentials in MCP config.

```bash
# Check for hardcoded secrets
grep -r "YOUR_.*_HERE" .opencode/mcp/ || echo "PASS: No hardcoded placeholders"
grep -r "sk-" .opencode/mcp/ || echo "PASS: No API key patterns"
```

**Expected Outcome**: All credentials reference environment variables.

### VS-04: Spec Kit Separation

**Goal**: Verify strict .specify/ and .opencode/ separation.

```bash
# Verify no OpenCode runtime components in .specify/
ls .specify/ | head -20
# Expected: Only governance, templates, scripts, workflows, memory

# Verify no Spec Kit governance in .opencode/
grep -r "constitution" .opencode/ || echo "PASS: No constitution in OpenCode layer"
grep -r "speckit" .opencode/ || echo "PASS: No speckit in OpenCode layer"
```

**Expected Outcome**: Clean separation between layers.

### VS-05: TDD Workflow End-to-End

**Goal**: Verify TDD command and agent work together.

```bash
# 1. Invoke /tdd command with a sample feature
# 2. Verify agent scaffolds interfaces
# 3. Verify tests are written before implementation
# 4. Verify RED-GREEN-REFACTOR cycle completes
# 5. Verify coverage reaches 80%+
```

**Expected Outcome**: TDD workflow completes with evidence of each phase.

### VS-06: Verification Workflow Honesty

**Goal**: Verify verification reports actual results.

```bash
# 1. Introduce a deliberate build error
# 2. Run /verify
# 3. Verify build check shows FAIL
# 4. Verify other checks show appropriate status (not false PASS)
# 5. Fix the error
# 6. Run /verify again
# 7. Verify all checks show PASS
```

**Expected Outcome**: Verification reports honest pass/fail/not-executed.

### VS-07: Documentation Completeness

**Goal**: Verify primary documentation is rewritten for OpenCode.

```bash
# Check README.md for Claude Code references
grep -i "claude code" README.md || echo "PASS: No Claude Code references in README"

# Check that installation instructions reference OpenCode
grep -i "opencode" README.md | head -5
```

**Expected Outcome**: Documentation is OpenCode-specific with no Claude Code runtime references.

### VS-08: License and Provenance

**Goal**: Verify upstream attribution is preserved.

```bash
# Check for MIT license
cat LICENSE | head -5

# Check for upstream attribution in adapted files
grep -r "everything-claude-code" .opencode/ | head -10
```

**Expected Outcome**: MIT license present; upstream provenance documented.

## Test Execution

```bash
# Run all framework tests
node .opencode/tests/behavioral/tdd-workflow.test.js
node .opencode/tests/behavioral/code-review.test.js
node .opencode/tests/behavioral/security-review.test.js
node .opencode/tests/behavioral/orchestration.test.js
node .opencode/tests/behavioral/verification.test.js
node .opencode/tests/behavioral/verification-honesty.test.js
node .opencode/tests/behavioral/memory-session.test.js
node .opencode/tests/behavioral/hooks.test.js
node .opencode/tests/behavioral/agent-permissions.test.js
node .opencode/tests/integration/mcp-config.test.js
node .opencode/tests/unit/utils.test.js
node .opencode/tests/unit/package-manager.test.js

# Expected: All tests pass with 80%+ coverage
```
