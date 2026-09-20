---
description: Run comprehensive verification on current codebase state
---

# Verification Command

Run comprehensive verification on current codebase state.

## Instructions

Execute verification in this exact order:

1. **Build Check**
   - Run the build command for this project
   - If it fails, report errors and STOP
   - If build tool is not available, report "NOT EXECUTED" (do NOT claim PASS)

2. **Type Check**
   - Run TypeScript/type checker
   - Report all errors with file:line
   - If type checker is not available, report "NOT EXECUTED" (do NOT claim PASS)

3. **Lint Check**
   - Run linter
   - Report warnings and errors
   - If linter is not available, report "NOT EXECUTED" (do NOT claim PASS)

4. **Test Suite**
   - Run all tests
   - Report pass/fail count
   - Report coverage percentage
   - If test runner is not available, report "NOT EXECUTED" (do NOT claim PASS)

5. **Console.log Audit**
   - Search for console.log in source files
   - Report locations

6. **Git Status**
   - Show uncommitted changes
   - Show files modified since last commit

## Honesty Requirements

CRITICAL: Every check MUST report its actual status:
- **OK** — check ran and passed
- **FAIL** — check ran and found issues
- **NOT EXECUTED** — check could not run (missing tool, unavailable dependency)

NEVER claim success for a check that was not actually executed.
NEVER skip reporting a check entirely. Every check line must appear in the output.

## Output

Produce a concise verification report:

```
VERIFICATION: [PASS/FAIL]

Build:    [OK/FAIL]
Types:    [OK/X errors]
Lint:     [OK/X issues]
Tests:    [X/Y passed, Z% coverage]
Secrets:  [OK/X found]
Logs:     [OK/X console.logs]

Ready for PR: [YES/NO]
```

If any critical issues, list them with fix suggestions.

## Arguments

$ARGUMENTS can be:
- `quick` - Only build + types
- `full` - All checks (default)
- `pre-commit` - Checks relevant for commits
- `pre-pr` - Full checks plus security scan
