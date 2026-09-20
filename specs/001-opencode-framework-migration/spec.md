# Feature Specification: OpenCode + Spec Kit Framework Migration

**Feature Branch**: `001-opencode-framework-migration`

**Created**: 2026-09-20

**Status**: Draft

**Input**: User description: "Transform the existing everything-claude-code repository into a reusable, native OpenCode + GitHub Spec Kit framework."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Framework Installation and Activation (Priority: P1)

A developer clones the repository and obtains a fully functional OpenCode development environment with specialized agents, skills, commands, hooks, and MCP integrations ready to use without any Claude Code dependencies.

**Why this priority**: Without a working installation, no other capability can be exercised. This is the foundation for all subsequent user stories.

**Independent Test**: Can be fully tested by cloning the repository into a fresh directory, configuring OpenCode to use it, and verifying that all agents, skills, and commands are discoverable and invocable.

**Acceptance Scenarios**:

1. **Given** a clean OpenCode installation, **When** the developer clones the repository and configures it, **Then** all agents appear in the agent registry with correct roles and permission boundaries.
2. **Given** the repository is installed, **When** the developer lists available skills, **Then** all migrated skills are present and free of Claude Code-specific references.
3. **Given** the repository is installed, **When** the developer lists available commands, **Then** all operational commands are present and Spec Kit commands are not duplicated.
4. **Given** the repository is installed, **When** the developer inspects the `.opencode/` directory, **Then** no Claude Code-specific paths, environment variables, or runtime assumptions remain.

---

### User Story 2 - Spec-Driven Development Workflow (Priority: P1)

A developer follows the canonical Spec Kit lifecycle (Constitution, Specify, Clarify, Plan, Tasks, Implement, Analyze, Converge) to develop new framework features with full traceability from requirement to implementation.

**Why this priority**: Spec-driven development is a core architectural principle. The framework must demonstrate its own governance model works.

**Independent Test**: Can be fully tested by creating a small feature specification, generating a plan, decomposing tasks, implementing one task, and verifying convergence between the spec and the implementation.

**Acceptance Scenarios**:

1. **Given** the Constitution is ratified, **When** a developer creates a new feature specification, **Then** the specification follows the Constitution's principles and constraints.
2. **Given** a feature specification exists, **When** the developer runs `/speckit.plan`, **Then** a plan is generated that references the specification and respects architectural boundaries.
3. **Given** a plan exists, **When** the developer runs `/speckit.tasks`, **Then** tasks are decomposed with clear acceptance criteria traceable to the specification.
4. **Given** tasks are implemented, **When** convergence analysis runs, **Then** discrepancies between specification and implementation are reported honestly.

---

### User Story 3 - Test-Driven Development Workflow (Priority: P2)

A developer uses the TDD command and agent to implement new functionality following the RED-GREEN-REFACTOR cycle with automated coverage verification.

**Why this priority**: TDD is a core engineering practice. The framework must support its own quality standards.

**Independent Test**: Can be fully tested by invoking the `/tdd` command on a sample function, verifying that tests are written before implementation, coverage reaches 80%+, and the cycle completes successfully.

**Acceptance Scenarios**:

1. **Given** a developer invokes `/tdd` with a feature description, **When** the TDD agent executes, **Then** it scaffolds interfaces, writes failing tests first, and implements minimal code to pass.
2. **Given** TDD implementation is complete, **When** coverage is checked, **Then** it meets or exceeds the 80% threshold.
3. **Given** a TDD session completes, **When** the developer reviews the output, **Then** the RED-GREEN-REFACTOR cycle is documented with evidence of each phase.

---

### User Story 4 - Code Review and Security Review (Priority: P2)

A developer uses the code review and security review agents to validate code quality, security posture, and adherence to project standards before merging.

**Why this priority**: Code review is essential for maintaining quality in a multi-contributor framework.

**Independent Test**: Can be fully tested by introducing a deliberate security issue (e.g., hardcoded credential) and verifying that the security reviewer agent detects it, and by introducing a code quality issue and verifying the code reviewer agent flags it.

**Acceptance Scenarios**:

1. **Given** code changes exist, **When** the code reviewer agent runs, **Then** it produces a prioritized report of critical, warning, and suggestion items.
2. **Given** code contains a hardcoded secret, **When** the security reviewer agent runs, **Then** it flags the issue as CRITICAL with a specific fix recommendation.
3. **Given** review feedback is generated, **When** the developer reads it, **Then** each issue includes file path, line number, and actionable remediation.

---

### User Story 5 - MCP Integration with Secure Credentials (Priority: P3)

A developer configures MCP server integrations with environment-backed credentials, enabling only the integrations needed for their project with documented purpose and security boundaries.

**Why this priority**: MCP integrations extend framework capabilities but must not compromise security or context window efficiency.

**Independent Test**: Can be fully tested by configuring one MCP server with an environment variable, verifying it connects successfully, and confirming that disabled servers do not load.

**Acceptance Scenarios**:

1. **Given** MCP configuration exists, **When** the developer inspects it, **Then** no credentials are hardcoded and all secrets reference environment variables.
2. **Given** multiple MCP servers are configured, **When** the developer enables only needed servers, **Then** disabled servers do not consume context window or network resources.
3. **Given** an MCP server is enabled, **When** the developer uses it, **Then** the integration has a documented purpose and expected usage scope.

---

### User Story 6 - Agent Orchestration and Parallel Execution (Priority: P3)

A developer delegates complex multi-step tasks to specialized agents, with the framework ensuring least-privilege permissions, predictable behavior, and no uncontrolled concurrent file modifications.

**Why this priority**: Agent orchestration enables scaling complex workflows but must be controlled to prevent race conditions and security issues.

**Independent Test**: Can be fully tested by delegating a task to two agents that would touch different files, verifying they complete without conflict, and then attempting to give a read-only agent write permissions and verifying it is rejected.

**Acceptance Scenarios**:

1. **Given** multiple agents are available, **When** the developer delegates a task, **Then** the agent receives only the permissions and tools required for its responsibilities.
2. **Given** parallel agent execution occurs, **When** agents complete, **Then** no uncontrolled concurrent modifications or ambiguous file ownership is observed.
3. **Given** a read-only agent is configured, **When** it attempts a write operation, **Then** the operation is blocked with a clear error message.

---

### User Story 7 - Verification and Quality Gates (Priority: P2)

A developer runs a comprehensive verification workflow that checks build validity, type safety, linting, tests, security, secrets, and documentation consistency, with honest reporting of actual results.

**Why this priority**: Verification gates ensure the framework meets its own quality standards before any release.

**Independent Test**: Can be fully tested by running the verification command on a codebase with known issues and verifying that each issue type is detected and reported accurately.

**Acceptance Scenarios**:

1. **Given** a verification run completes, **When** the developer reads the report, **Then** each check shows actual pass/fail status with no claimed successes for unexecuted checks.
2. **Given** a build error exists, **When** verification runs, **Then** the build check fails and subsequent checks report appropriately (not false positives).
3. **Given** a hardcoded secret exists in source, **When** verification runs, **Then** the secret detection check flags it with file and line reference.

---

### User Story 8 - Memory and Session State Management (Priority: P3)

A developer benefits from session persistence and context loading across sessions, with the understanding that learned information is non-authoritative and never overrides the Constitution or specifications.

**Why this priority**: Session memory improves developer experience but must not compromise governance integrity.

**Independent Test**: Can be fully tested by completing a session, starting a new session, and verifying that previous context is available while the Constitution remains authoritative.

**Acceptance Scenarios**:

1. **Given** a session completes, **When** a new session starts, **Then** previous context is available for reference.
2. **Given** learned information conflicts with the Constitution, **When** both are consulted, **Then** the Constitution takes precedence.
3. **Given** persistent knowledge exists, **When** the developer inspects it, **Then** it is categorized as governance, documentation, specifications, runtime state, or learned information.

---

### Edge Cases

- What happens when a component has dual Claude Code and OpenCode runtime assumptions? The component MUST be classified as "requiring adaptation" and both assumptions MUST be resolved before migration.
- What happens when a source skill is syntactically portable but semantically depends on Claude Code tool behavior? The skill MUST be adapted to use OpenCode-native tool semantics.
- What happens when the `/plan` command and `/speckit-plan` would produce overlapping output? The framework MUST NOT create a competing `/plan` workflow; the OpenCode `/plan` command MUST be removed or redesigned to delegate to Spec Kit.
- What happens when parallel agents attempt to modify the same file? The framework MUST prevent this through explicit file ownership tracking or sequential execution.
- What happens when a verification check cannot execute (e.g., missing build tool)? The report MUST show "NOT EXECUTED" rather than "PASS" or "SKIP".
- What happens when the Constitution is amended after specifications are written? Specifications MUST be reviewed for consistency with the updated Constitution.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a complete inventory and classification of all source components as portable, requiring adaptation, requiring redesign, obsolete, replaced by native OpenCode, or replaced by native Spec Kit.
- **FR-002**: System MUST migrate all 9 specialized agents to OpenCode-native agent definitions with explicit roles, descriptions, tool access, and least-privilege permissions.
- **FR-003**: System MUST evaluate the planner agent against Spec Kit's `/speckit-plan` capability and remove or redesign it to avoid duplication.
- **FR-004**: System MUST migrate 14 operational commands to OpenCode and remove 1 command (planner/plan) that duplicates Spec Kit functionality.
- **FR-005**: System MUST migrate all 11 skills to OpenCode-compatible format, auditing each for Claude Code-specific references, environment variables, tool assumptions, and lifecycle behavior.
- **FR-006**: System MUST redesign all Claude Code hooks using OpenCode-native plugin APIs, separating independent lifecycle concerns (lifecycle, Git safeguards, formatting, verification, memory/session state, compaction, logging).
- **FR-007**: System MUST convert MCP configurations to OpenCode-native format with environment-backed credentials and default-to-disabled policy.
- **FR-008**: System MUST classify all 8 rule files as constitutional governance, OpenCode runtime instruction, skill-specific guidance, or obsolete Claude Code behavior, placing each in the appropriate location.
- **FR-009**: System MUST preserve useful memory, checkpoint, learning, and compaction capabilities using OpenCode-compatible mechanisms while keeping runtime memory non-authoritative.
- **FR-010**: System MUST provide a coherent verification workflow covering build, types, linting, tests, security, secrets, runtime behavior, and documentation consistency.
- **FR-011**: System MUST include automated tests for framework behavior covering utilities, agent configuration, command behavior, plugin behavior, MCP configuration, and security-sensitive behavior.
- **FR-012**: System MUST rewrite README.md and primary documentation for OpenCode + Spec Kit, removing Claude Code-specific documentation from primary runtime documentation.
- **FR-013**: System MUST enforce strict separation between `.specify/` (Spec Kit layer) and `.opencode/` (OpenCode layer) with no cross-layer responsibility duplication.
- **FR-014**: System MUST remove the `.claude-plugin/` metadata directory and Claude Code-specific plugin configuration.
- **FR-015**: System MUST preserve upstream provenance and MIT license attribution for all adapted components.
- **FR-016**: System MUST validate that no component depends on Claude Code-specific runtime mechanisms, environment variables, hook APIs, tool names, transcript formats, or filesystem conventions.

### Key Entities

- **Agent**: A specialized autonomous unit with defined role, system instructions, tool access, and permission boundaries. Each agent has exactly one clear owner and responsibility.
- **Skill**: Reusable knowledge or procedure that describes how to accomplish a domain-specific task. Skills must not assume specific runtime tools or lifecycle behavior.
- **Command**: An operational slash command that triggers a specific workflow (TDD, verification, review, etc.). Commands must not duplicate Spec Kit functionality.
- **Plugin**: An OpenCode-native lifecycle extension that implements behavior using OpenCode plugin APIs. Plugins must be modular and testable.
- **Hook**: A triggered automation that fires on specific events (pre-tool, post-tool, session start/end). Hooks must have explicit conditions and avoid side effects.
- **MCP Integration**: A Model Context Protocol server connection with documented purpose, environment-backed credentials, and explicit enable/disable control.
- **Rule**: A guideline classified as constitutional governance, runtime instruction, skill-specific guidance, or obsolete behavior. Rules must not be duplicated across layers.
- **Specification**: A feature specification in `.specify/` that defines WHAT the system must do, traceable to implementation tasks.
- **Constitution**: The authoritative governance document at `.specify/memory/constitution.md` that all components must comply with.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 8 agents are migrated and operational in OpenCode with zero Claude Code runtime dependencies; 1 agent (planner) is replaced by native Spec Kit.
- **SC-002**: All 11 skills are migrated and pass a Claude Code reference audit with zero remaining Claude Code-specific assumptions.
- **SC-003**: 14 commands are migrated to OpenCode and 1 command (planner/plan) is removed to avoid Spec Kit duplication.
- **SC-004**: All hooks are redesigned using OpenCode-native plugin APIs with zero `${CLAUDE_PLUGIN_ROOT}` references remaining.
- **SC-005**: MCP configurations use environment-backed credentials with zero hardcoded secrets.
- **SC-006**: The verification workflow reports honest pass/fail/not-executed status for every check with zero false positives.
- **SC-007**: Automated test coverage for framework behavior reaches 80% or higher.
- **SC-008**: Primary documentation is rewritten for OpenCode + Spec Kit with zero Claude Code-specific runtime documentation in primary guides.
- **SC-009**: The `.specify/` and `.opencode/` directories maintain strict separation with no cross-layer responsibility duplication.
- **SC-010**: Every migrated component is traceable to a classification (portable, requiring adaptation, requiring redesign, obsolete, replaced by native OpenCode, replaced by native Spec Kit) in the component inventory.

## Assumptions

- OpenCode supports agent definitions with explicit tool access, permission boundaries, and model configuration.
- OpenCode supports plugin APIs that can implement lifecycle hooks (pre-tool, post-tool, session start/end, compaction).
- OpenCode supports skill definitions that are loaded on demand and can reference multiple tools.
- OpenCode supports slash commands with custom descriptions and agent delegation.
- Spec Kit provides `/speckit.plan`, `/speckit.tasks`, `/speckit.specify`, `/speckit.clarify`, and `/speckit.converge` as authoritative SDD commands.
- The existing test infrastructure (Node.js test runner) can be adapted for OpenCode framework testing.
- The MIT license from the upstream `everything-claude-code` project applies to adapted components.
- The framework targets the current stable versions of OpenCode and Spec Kit at time of implementation.
- Dynamic contexts (dev.md, review.md, research.md) are OpenCode-compatible if they do not depend on Claude Code-specific injection mechanisms.
- The `continuous-learning` and `strategic-compact` skills may require significant redesign if they depend on Claude Code transcript or session-specific APIs.
