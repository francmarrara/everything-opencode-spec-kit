# Tasks: OpenCode + Spec Kit Framework Migration

**Input**: Design documents from `/specs/001-opencode-framework-migration/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project directory structure and foundational configuration

- [ ] T001 Create `.opencode/agents/` directory structure per plan.md
- [ ] T002 Create `.opencode/commands/` directory structure per plan.md
- [ ] T003 Create `.opencode/skills/` directory structure with all 11 skill subdirectories per plan.md
- [ ] T004 Create `.opencode/instructions/` directory for migrated rules
- [ ] T005 Create `.opencode/plugins/` directory with lifecycle/, git-safeguards/, formatting/, verification/, memory-session/, logging/ subdirectories
- [ ] T006 Create `.opencode/mcp/` directory for MCP configurations
- [ ] T007 Create `.opencode/lib/` directory for shared utilities
- [ ] T008 Create `.opencode/tests/` directory with unit/, integration/, behavioral/ subdirectories
- [ ] T009 Verify `.opencode/package.json` has `@opencode-ai/plugin` dependency
- [ ] T010 Verify `.specify/` directory is unchanged and constitution.md is present

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core utilities and contracts that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T011 Adapt `scripts/lib/utils.js` to `.opencode/lib/utils.js` replacing `getClaudeDir()` with OpenCode equivalent, replacing `readStdinJson()` with OpenCode hook I/O, replacing `log()`/`output()` with OpenCode equivalents per contracts/hook-contract.md
- [ ] T012 Adapt `scripts/lib/package-manager.js` to `.opencode/lib/package-manager.js` replacing `CLAUDE_PACKAGE_MANAGER` with OpenCode env var, replacing `~/.claude/package-manager.json` with OpenCode path per research R5
- [ ] T013 Create `.opencode/lib/constants.js` defining OpenCode-specific constants (paths, env var names, event names) replacing all `CLAUDE_*` references
- [x] T014 Adapt `scripts/run-all.js` test runner to `.opencode/tests/run-all.js` updating Claude Code test assertions to OpenCode equivalents per research R10 (completed - orchestrates 12 test files)
- [ ] T015 Create `.opencode/instructions/security.md` by migrating `rules/security.md` content, removing Claude Code-specific references
- [ ] T016 Create `.opencode/instructions/coding-style.md` by migrating `rules/coding-style.md` content
- [ ] T017 Create `.opencode/instructions/testing.md` by migrating `rules/testing.md` content
- [ ] T018 Create `.opencode/instructions/git-workflow.md` by migrating `rules/git-workflow.md` content, replacing `~/.claude/settings.json` references
- [ ] T019 Create `.opencode/instructions/patterns.md` by migrating `rules/patterns.md` content
- [ ] T020 Adapt `rules/performance.md` to `.opencode/instructions/performance.md` replacing Claude Code model names (Haiku, Sonnet, Opus) with OpenCode model equivalents
- [ ] T021 Delete `.claude-plugin/plugin.json` (obsolete Claude Code plugin metadata) per FR-014
- [ ] T022 Delete `.claude-plugin/marketplace.json` (obsolete Claude Code marketplace metadata) per FR-014
- [ ] T023 Delete `rules/agents.md` (obsolete Claude Code agent delegation rules)
- [ ] T024 Delete `rules/hooks.md` (obsolete Claude Code hook configuration rules)
- [ ] T025 Create `.opencode/contracts/agent-contract.md` with agent definition format per contracts/agent-contract.md
- [ ] T026 Create `.opencode/contracts/skill-contract.md` with skill format per contracts/skill-contract.md
- [ ] T027 Create `.opencode/contracts/command-contract.md` with command format per contracts/command-contract.md
- [ ] T028 Create `.opencode/contracts/hook-contract.md` with plugin/hook format per contracts/hook-contract.md
- [ ] T029 Create `.opencode/contracts/mcp-contract.md` with MCP configuration format per contracts/mcp-contract.md

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Framework Installation and Activation (Priority: P1) 🎯 MVP

**Goal**: Developer clones repository and obtains fully functional OpenCode environment with zero Claude Code dependencies

**Independent Test**: Clone repo, configure OpenCode, verify all agents/skills/commands discoverable and no Claude Code references remain

### Implementation for User Story 1

- [ ] T030 [P] [US1] Migrate `agents/architect.md` to `.opencode/agents/architect.md` replacing `tools:` with OpenCode tool names, removing `model: opus` if unsupported, per agent-contract.md
- [ ] T031 [P] [US1] Migrate `agents/build-error-resolver.md` to `.opencode/agents/build-error-resolver.md` with tool name mapping
- [ ] T032 [P] [US1] Migrate `agents/code-reviewer.md` to `.opencode/agents/code-reviewer.md` with tool name mapping, removing `~/.claude/` references
- [ ] T033 [P] [US1] Migrate `agents/doc-updater.md` to `.opencode/agents/doc-updater.md` with tool name mapping, replacing `~/.claude/agents/` paths
- [ ] T034 [P] [US1] Migrate `agents/e2e-runner.md` to `.opencode/agents/e2e-runner.md` with tool name mapping
- [ ] T035 [P] [US1] Migrate `agents/refactor-cleaner.md` to `.opencode/agents/refactor-cleaner.md` with tool name mapping
- [ ] T036 [P] [US1] Migrate `agents/security-reviewer.md` to `.opencode/agents/security-reviewer.md` with tool name mapping, removing "Claude Code security-reviewer" reference
- [ ] T037 [P] [US1] Migrate `agents/tdd-guide.md` to `.opencode/agents/tdd-guide.md` with tool name mapping
- [ ] T038 [US1] Delete `agents/planner.md` (replaced by native Spec Kit /speckit-plan) per FR-003
- [ ] T039 [P] [US1] Migrate `commands/build-fix.md` to `.opencode/commands/build-fix.md` (portable, minimal changes)
- [ ] T040 [P] [US1] Migrate `commands/checkpoint.md` to `.opencode/commands/checkpoint.md` replacing `~/.claude/checkpoints.log` with OpenCode path
- [ ] T041 [P] [US1] Migrate `commands/code-review.md` to `.opencode/commands/code-review.md` updating agent reference path
- [ ] T042 [P] [US1] Migrate `commands/e2e.md` to `.opencode/commands/e2e.md` replacing `~/.claude/agents/e2e-runner.md` with `.opencode/agents/e2e-runner.md`
- [ ] T043 [P] [US1] Migrate `commands/eval.md` to `.opencode/commands/eval.md` replacing `.claude/evals/` with `.opencode/evals/`
- [ ] T044 [P] [US1] Migrate `commands/learn.md` to `.opencode/commands/learn.md` replacing `~/.claude/skills/learned/` with `.opencode/skills/learned/`
- [ ] T045 [P] [US1] Migrate `commands/orchestrate.md` to `.opencode/commands/orchestrate.md` (portable)
- [ ] T046 [P] [US1] Migrate `commands/refactor-clean.md` to `.opencode/commands/refactor-clean.md` (portable)
- [ ] T047 [P] [US1] Migrate `commands/setup-pm.md` to `.opencode/commands/setup-pm.md` removing `disable-model-invocation` frontmatter, replacing `CLAUDE_PACKAGE_MANAGER`
- [ ] T048 [P] [US1] Migrate `commands/tdd.md` to `.opencode/commands/tdd.md` replacing `~/.claude/agents/tdd-guide.md` and `~/.claude/skills/tdd-workflow/` paths
- [ ] T049 [P] [US1] Migrate `commands/test-coverage.md` to `.opencode/commands/test-coverage.md` (portable)
- [ ] T050 [P] [US1] Migrate `commands/update-codemaps.md` to `.opencode/commands/update-codemaps.md` (portable)
- [ ] T051 [P] [US1] Migrate `commands/update-docs.md` to `.opencode/commands/update-docs.md` (portable)
- [ ] T052 [P] [US1] Migrate `commands/verify.md` to `.opencode/commands/verify.md` (portable)
- [ ] T053 [US1] Delete `commands/plan.md` (replaced by native Spec Kit /speckit-plan) per FR-003
- [ ] T054 [P] [US1] Migrate `skills/backend-patterns/SKILL.md` to `.opencode/skills/backend-patterns/SKILL.md` (portable, no runtime deps)
- [ ] T055 [P] [US1] Migrate `skills/clickhouse-io/SKILL.md` to `.opencode/skills/clickhouse-io/SKILL.md` (portable)
- [ ] T056 [P] [US1] Migrate `skills/coding-standards/SKILL.md` to `.opencode/skills/coding-standards/SKILL.md` (portable)
- [ ] T057 [P] [US1] Migrate `skills/eval-harness/SKILL.md` to `.opencode/skills/eval-harness/SKILL.md` replacing `.claude/evals/` with `.opencode/evals/`
- [ ] T058 [P] [US1] Migrate `skills/frontend-patterns/SKILL.md` to `.opencode/skills/frontend-patterns/SKILL.md` (portable)
- [ ] T059 [P] [US1] Migrate `skills/project-guidelines-example/SKILL.md` to `.opencode/skills/project-guidelines-example/SKILL.md` (portable)
- [ ] T060 [P] [US1] Migrate `skills/security-review/SKILL.md` to `.opencode/skills/security-review/SKILL.md` (portable)
- [ ] T061 [P] [US1] Migrate `skills/tdd-workflow/SKILL.md` to `.opencode/skills/tdd-workflow/SKILL.md` (portable)
- [ ] T062 [P] [US1] Migrate `skills/verification-loop/SKILL.md` to `.opencode/skills/verification-loop/SKILL.md` replacing PostToolUse hook references with OpenCode equivalents
- [ ] T063 [US1] Redesign `skills/continuous-learning/SKILL.md` to `.opencode/skills/continuous-learning/SKILL.md` replacing `CLAUDE_TRANSCRIPT_PATH`, Stop hook, `~/.claude/skills/learned/` with OpenCode mechanisms per research R8
- [ ] T064 [US1] Redesign `skills/strategic-compact/SKILL.md` to `.opencode/skills/strategic-compact/SKILL.md` replacing `CLAUDE_SESSION_ID`, PreToolUse hook, `/compact` with OpenCode mechanisms per research R9
- [ ] T065 [P] [US1] Migrate `contexts/dev.md` to `.opencode/instructions/dev-context.md` replacing Claude Code tool names (Edit, Write, Bash, Grep, Glob) with OpenCode equivalents
- [ ] T066 [P] [US1] Migrate `contexts/research.md` to `.opencode/instructions/research-context.md` replacing Claude Code tool names (Read, Grep, Glob, WebSearch, WebFetch, Task)
- [ ] T067 [P] [US1] Migrate `contexts/review.md` to `.opencode/instructions/review-context.md` replacing Claude Code tool names
- [ ] T068 [US1] Run `grep -r "CLAUDE_" .opencode/` and verify zero results (SC-001, SC-002, SC-003)
- [ ] T069 [US1] Run `grep -r "~/.claude" .opencode/` and verify zero results (SC-001, SC-004)
- [ ] T070 [US1] Run `grep -r "claude-plugin" .opencode/` and verify zero results (FR-014, SC-010)
- [ ] T071 [US1] Verify `.specify/` and `.opencode/` separation with no cross-layer responsibility duplication (SC-009)

**Checkpoint**: Framework installed and activated with zero Claude Code dependencies

---

## Phase 4: User Story 2 - Spec-Driven Development Workflow (Priority: P1)

**Goal**: Developer follows canonical Spec Kit lifecycle with full traceability

**Independent Test**: Create a small feature spec, generate plan, decompose tasks, implement one task, verify convergence

### Implementation for User Story 2

- [ ] T072 [US2] Verify Constitution at `.specify/memory/constitution.md` is loadable and all 17 principles are present
- [ ] T073 [US2] Verify `/speckit.specify` creates a valid spec following the spec template structure
- [ ] T074 [US2] Verify `/speckit.plan` generates a plan referencing the spec and respecting architectural boundaries
- [ ] T075 [US2] Verify `/speckit.tasks` decomposes tasks with clear acceptance criteria traceable to the spec
- [ ] T076 [US2] Verify `/speckit.converge` reports discrepancies between spec and implementation honestly
- [ ] T077 [US2] Create `.opencode/instructions/sdd-workflow.md` documenting how OpenCode operational commands complement Spec Kit SDD commands without duplication
- [ ] T078 [US2] Verify no OpenCode command duplicates Spec Kit functionality (FR-004, Constitution Principle III)

**Checkpoint**: Spec-driven development workflow operational

---

## Phase 5: User Story 3 - Test-Driven Development Workflow (Priority: P2)

**Goal**: Developer uses TDD command and agent for RED-GREEN-REFACTOR cycle with coverage verification

**Independent Test**: Invoke `/tdd` on sample function, verify tests before implementation, coverage 80%+

### Implementation for User Story 3

- [ ] T079 [P] [US3] Verify `.opencode/agents/tdd-guide.md` agent is invocable and has correct tool permissions (Read, Write, Edit, Bash, Grep)
- [ ] T080 [P] [US3] Verify `.opencode/commands/tdd.md` command delegates to tdd-guide agent correctly
- [ ] T081 [P] [US3] Verify `.opencode/skills/tdd-workflow/SKILL.md` is loaded and provides TDD methodology guidance
- [ ] T082 [US3] Create `.opencode/tests/behavioral/tdd-workflow.test.js` validating TDD agent scaffolds interfaces, writes failing tests first, implements minimal code, and documents RED-GREEN-REFACTOR cycle
- [ ] T083 [US3] Run TDD workflow end-to-end on a sample function and verify 80%+ coverage achieved

**Checkpoint**: TDD workflow functional with evidence of each phase

---

## Phase 6: User Story 4 - Code Review and Security Review (Priority: P2)

**Goal**: Developer uses code review and security review agents to validate quality and security

**Independent Test**: Introduce hardcoded credential, verify security reviewer detects it; introduce quality issue, verify code reviewer flags it

### Implementation for User Story 4

- [ ] T084 [P] [US4] Verify `.opencode/agents/code-reviewer.md` agent produces prioritized report (critical, warning, suggestion) with file path, line number, and remediation
- [ ] T085 [P] [US4] Verify `.opencode/agents/security-reviewer.md` agent detects hardcoded secrets, SQL injection, XSS, and other security issues
- [ ] T086 [P] [US4] Verify `.opencode/commands/code-review.md` command delegates to code-reviewer agent correctly
- [ ] T087 [P] [US4] Verify `.opencode/skills/security-review/SKILL.md` provides security checklist guidance
- [ ] T088 [US4] Create `.opencode/tests/behavioral/code-review.test.js` validating code reviewer produces CRITICAL/WARNING/SUGGESTION output with file:line references
- [ ] T089 [US4] Create `.opencode/tests/behavioral/security-review.test.js` validating security reviewer detects hardcoded credential pattern

**Checkpoint**: Code review and security review agents functional

---

## Phase 7: User Story 5 - MCP Integration with Secure Credentials (Priority: P3)

**Goal**: Developer configures MCP servers with environment-backed credentials, default-to-disabled

**Independent Test**: Configure one MCP server with env var, verify connection; confirm disabled servers don't load

### Implementation for User Story 5

- [ ] T090 [US5] Create `.opencode/mcp/mcp-servers.json` converting `mcp-configs/mcp-servers.json` to OpenCode-native format per contracts/mcp-contract.md
- [ ] T091 [US5] Replace all `YOUR_*_HERE` placeholder credentials with `${ENV_VAR}` references in `.opencode/mcp/mcp-servers.json`
- [ ] T092 [US5] Set `enabled: false` as default for all MCP servers in `.opencode/mcp/mcp-servers.json`
- [ ] T093 [US5] Add `description` field with documented purpose and usage scope for each MCP server
- [ ] T094 [US5] Create `.opencode/tests/integration/mcp-config.test.js` validating no hardcoded secrets and all servers default to disabled
- [ ] T095 [US5] Verify `grep -r "YOUR_.*_HERE" .opencode/mcp/` returns zero results (SC-005)

**Checkpoint**: MCP integrations secure with environment-backed credentials

---

## Phase 8: User Story 6 - Agent Orchestration and Parallel Execution (Priority: P3)

**Goal**: Framework ensures least-privilege permissions and no uncontrolled concurrent modifications

**Independent Test**: Delegate task to two agents touching different files, verify no conflict; verify read-only agent cannot write

### Implementation for User Story 6

- [ ] T096 [US6] Audit all 8 agents in `.opencode/agents/` verifying each has only required tools (least-privilege per Constitution Principle IX)
- [ ] T097 [US6] Document agent permission justification for each agent in `.opencode/agents/README.md`
- [ ] T098 [US6] Create `.opencode/tests/behavioral/agent-permissions.test.js` validating read-only agents cannot access write tools
- [ ] T099 [US6] Verify no agent has unnecessary `Bash` or `Write` permission when `Read` and `Grep` suffice

**Checkpoint**: Agent permissions validated and documented

---

## Phase 9: User Story 7 - Verification and Quality Gates (Priority: P2)

**Goal**: Verification workflow reports honest pass/fail/not-executed for every check

**Independent Test**: Run verification on codebase with known issues, verify each issue type detected accurately

### Implementation for User Story 7

- [x] T100 [US7] Adapt `commands/verify.md` to `.opencode/commands/verify.md` ensuring verification workflow covers build, types, linting, tests, security, secrets, runtime, documentation (completed in T052)
- [ ] T101 [US7] Create `.opencode/tests/behavioral/verification.test.js` validating verification reports "NOT EXECUTED" for missing tools (not false PASS)
- [ ] T102 [US7] Create `.opencode/tests/behavioral/verification-honesty.test.js` validating no claimed successes for unexecuted checks (SC-006)
- [ ] T103 [US7] Verify verification workflow produces honest pass/fail/not-executed status for each check

**Checkpoint**: Verification workflow honest and comprehensive

---

## Phase 10: User Story 8 - Memory and Session State Management (Priority: P3)

**Goal**: Session persistence available but non-authoritative; Constitution always takes precedence

**Independent Test**: Complete session, start new session, verify context available while Constitution remains authoritative

### Implementation for User Story 8

- [ ] T104 [US8] Create `.opencode/plugins/memory-session/` directory for memory/session plugin
- [ ] T105 [US8] Implement `.opencode/plugins/memory-session/index.js` using OpenCode plugin API for session state persistence
- [x] T106 [US8] Implement `.opencode/plugins/memory-session/index.js` with onSessionStart and onSessionEnd hooks replacing `CLAUDE_PLUGIN_ROOT` and `~/.claude/sessions/` with OpenCode paths (completed in T105)
- [x] T107 [US8] Verify memory-session plugin uses OpenCode utils and has no Claude Code references (completed in T105)
- [ ] T108 [US8] Create `.opencode/tests/integration/memory-session.test.js` validating session state is available across sessions but Constitution takes precedence
- [ ] T109 [US8] Verify learned information is categorized as runtime state and does not override Constitution (Constitution Principle XII)

**Checkpoint**: Memory and session state functional but non-authoritative

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T110 [P] Adapt `scripts/hooks/pre-compact.js` to `.opencode/plugins/lifecycle/pre-compact.js` replacing `CLAUDE_PLUGIN_ROOT` with OpenCode path
- [ ] T111 [P] Adapt `scripts/hooks/suggest-compact.js` to `.opencode/plugins/lifecycle/suggest-compact.js` replacing `CLAUDE_SESSION_ID` and `CLAUDE_PLUGIN_ROOT`
- [ ] T112 [P] Adapt `scripts/hooks/evaluate-session.js` to `.opencode/plugins/lifecycle/evaluate-session.js` replacing `CLAUDE_TRANSCRIPT_PATH` with OpenCode session mechanism per research R8
- [ ] T113 [P] Create `.opencode/plugins/git-safeguards/` implementing git push review and dev-server-block PreToolUse hooks using OpenCode plugin API (maps source PreToolUse: tmux block, tmux reminder, git push review)
- [ ] T114 [P] Create `.opencode/plugins/formatting/` implementing auto-format-on-edit PostToolUse hook using OpenCode plugin API (maps source PostToolUse: Prettier auto-format)
- [ ] T115 [P] Create `.opencode/plugins/verification/` implementing type-check-on-edit and console.log-detect PostToolUse hooks using OpenCode plugin API (maps source PostToolUse: TypeScript check, console.log warning)
- [ ] T116 [P] Create `.opencode/plugins/logging/` implementing console.log detection in Stop event using OpenCode plugin API (maps source Stop: console.log audit in modified files)
- [ ] T117 Adapt `scripts/setup-package-manager.js` to `.opencode/scripts/setup-package-manager.js` replacing `CLAUDE_PACKAGE_MANAGER` and `~/.claude/` paths
- [ ] T118 Adapt `tests/hooks/hooks.test.js` to `.opencode/tests/behavioral/hooks.test.js` replacing Claude Code hook event validation with OpenCode equivalents
- [ ] T119 Adapt `tests/lib/utils.test.js` to `.opencode/tests/unit/utils.test.js` replacing Claude Code-specific assertions
- [ ] T120 Adapt `tests/lib/package-manager.test.js` to `.opencode/tests/unit/package-manager.test.js` replacing Claude Code-specific assertions
- [x] T121 Rewrite `README.md` for OpenCode + Spec Kit removing all Claude Code-specific runtime documentation per FR-012 and SC-008 (completed - full rewrite with OpenCode architecture, agents, commands, skills, Spec Kit integration, MCP, testing sections)
- [ ] T122 Add upstream provenance attribution to all adapted files per Constitution Principle XVI and FR-015
- [ ] T123 Verify MIT license is present and not removed per Constitution Principle XVI
- [x] T124 Run full test suite: `node .opencode/tests/run-all.js` and verify 80%+ coverage (SC-007) (completed - 98/98 tests pass)
- [ ] T125 Run final Claude Code reference audit: `grep -r "CLAUDE_\|~/.claude\|claude-plugin\|You are Claude" .opencode/` and verify zero results (FR-016, SC-010)
- [ ] T126 Run quickstart.md validation scenarios VS-01 through VS-08

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-10)**: All depend on Foundational phase completion
  - US1 (P1): Can start after Foundational - No dependencies on other stories
  - US2 (P1): Can start after Foundational - No dependencies on other stories
  - US3 (P2): Can start after Foundational - May use US1 agents/commands
  - US4 (P2): Can start after Foundational - May use US1 agents/commands
  - US5 (P3): Can start after Foundational - Independent of other stories
  - US6 (P3): Can start after Foundational - Depends on US1 agents being migrated
  - US7 (P2): Can start after Foundational - May use US1 verify command
  - US8 (P3): Can start after Foundational - Independent of other stories
- **Polish (Phase 11)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **US2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **US3 (P2)**: Can start after Foundational (Phase 2) - Uses US1 agents/commands
- **US4 (P2)**: Can start after Foundational (Phase 2) - Uses US1 agents/commands
- **US5 (P3)**: Can start after Foundational (Phase 2) - Independent
- **US6 (P3)**: Can start after Foundational (Phase 2) - Depends on US1 agents
- **US7 (P2)**: Can start after Foundational (Phase 2) - Uses US1 verify command
- **US8 (P3)**: Can start after Foundational (Phase 2) - Independent

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T001-T010)
- All Foundational tasks marked [P] can run in parallel within Phase 2
- Once Foundational phase completes, US1 and US2 can start in parallel (both P1)
- All US1 agent migrations (T030-T037) can run in parallel
- All US1 command migrations (T039-T052) can run in parallel
- All US1 skill migrations (T054-T061) can run in parallel
- All US1 context migrations (T065-T067) can run in parallel
- US3, US4, US5, US6, US7, US8 can all start in parallel after Foundational

---

## Parallel Example: User Story 1

```bash
# Launch all agent migrations together:
Task: "Migrate agents/architect.md to .opencode/agents/architect.md"
Task: "Migrate agents/build-error-resolver.md to .opencode/agents/build-error-resolver.md"
Task: "Migrate agents/code-reviewer.md to .opencode/agents/code-reviewer.md"
Task: "Migrate agents/doc-updater.md to .opencode/agents/doc-updater.md"
Task: "Migrate agents/e2e-runner.md to .opencode/agents/e2e-runner.md"
Task: "Migrate agents/refactor-cleaner.md to .opencode/agents/refactor-cleaner.md"
Task: "Migrate agents/security-reviewer.md to .opencode/agents/security-reviewer.md"
Task: "Migrate agents/tdd-guide.md to .opencode/agents/tdd-guide.md"

# Launch all command migrations together:
Task: "Migrate commands/build-fix.md to .opencode/commands/build-fix.md"
Task: "Migrate commands/checkpoint.md to .opencode/commands/checkpoint.md"
# ... (all 13 portable commands)

# Launch all skill migrations together:
Task: "Migrate skills/backend-patterns/SKILL.md to .opencode/skills/backend-patterns/SKILL.md"
Task: "Migrate skills/clickhouse-io/SKILL.md to .opencode/skills/clickhouse-io/SKILL.md"
# ... (all 8 portable skills)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (directory structure)
2. Complete Phase 2: Foundational (utilities, contracts, instructions)
3. Complete Phase 3: User Story 1 (agents, commands, skills, contexts)
4. **STOP and VALIDATE**: Run grep audits, verify zero Claude Code references
5. Framework is usable as OpenCode environment

### Incremental Delivery

1. Setup + Foundational -> Foundation ready
2. US1 + US2 -> Core framework + SDD workflow operational (MVP!)
3. US3 + US4 + US7 -> TDD, review, verification workflows
4. US5 + US6 + US8 -> MCP, orchestration, memory
5. Polish -> Documentation, tests, provenance

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: US1 (agents, commands, skills, contexts)
   - Developer B: US2 (Spec Kit workflow validation)
   - Developer C: US5 + US8 (MCP + memory, independent)
3. After US1 completes:
   - Developer A: US3 + US4 (TDD + review, depend on US1)
   - Developer B: US7 (verification)
   - Developer C: US6 (orchestration, depends on US1)
4. Polish phase: all developers

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Total tasks: 126
- Tasks per story: US1=42, US2=7, US3=5, US4=6, US5=6, US6=4, US7=4, US8=6, Setup=10, Foundational=19, Polish=17
