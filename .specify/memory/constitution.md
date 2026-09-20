<!-- Sync Impact Report
Version change: N/A → 1.0.0
Modified principles: N/A (initial adoption)
Added sections: All 17 principles, Additional Constraints (Architecture, Commands, Agents, Skills, Plugins, MCP), Governance
Removed sections: None
Follow-up TODOs: None
-->

# Everything OpenCode + Spec Kit Constitution

## Core Principles

### I. OpenCode-Native Runtime

The framework MUST be designed and implemented for OpenCode as its
primary execution runtime.

No component MUST depend on Claude Code-specific runtime mechanisms,
environment variables, hook APIs, tool names, transcript formats,
plugin metadata, or filesystem conventions.

Claude Code compatibility MAY be preserved only as documented
source/reference material when it does not compromise OpenCode-native
behavior.

Every migrated component MUST be reviewed for semantic compatibility,
not merely converted syntactically.

### II. Spec-Driven Development

All substantial framework changes MUST follow the Spec Kit workflow.

The canonical development lifecycle is:

`Constitution → Specify → Clarify → Plan → Tasks → Implement → Analyze → Converge`

The exact subset MAY be adapted for trivial changes, but feature-level
work MUST have traceable specification, implementation tasks, and
verification.

The specification defines WHAT the system must do.

The plan defines HOW it will be implemented.

The tasks define the concrete work required.

Implementation MUST NOT silently redefine requirements.

### III. Separation of Responsibilities

Spec Kit and OpenCode MUST have clearly separated responsibilities.

Spec Kit is responsible for:

* project constitution;
* feature specifications;
* architectural planning;
* task decomposition;
* consistency analysis;
* convergence between intended and implemented behavior.

OpenCode is responsible for:

* agent execution;
* skills;
* commands;
* instructions;
* plugins;
* hooks;
* MCP integrations;
* runtime orchestration.

The framework MUST NOT duplicate Spec Kit functionality inside OpenCode
components when an existing Spec Kit capability already provides that
responsibility.

In particular, the framework MUST NOT introduce a competing `/plan`
workflow that duplicates `/speckit-plan`.

### IV. Faithful Transformation of Upstream Capabilities

The project originates from `everything-claude-code` and MUST preserve
the useful capabilities and intent of its source components while
adapting their implementation to OpenCode.

Every migrated component MUST be classified before implementation as
one of:

* portable;
* requiring adaptation;
* requiring redesign;
* obsolete;
* replaced by native OpenCode or Spec Kit functionality.

Blind file-by-file copying is prohibited.

Functional equivalence MUST be evaluated at the behavior level.

Source-specific assumptions MUST be explicitly identified and removed
or replaced.

### V. Explicit Architecture and Single Responsibility

Each framework capability MUST have one clear owner.

Agents, skills, commands, plugins, hooks, instructions, MCP
integrations and Spec Kit artifacts MUST NOT contain overlapping
responsibilities without documented justification.

Components SHOULD remain small, composable and independently
understandable.

New abstractions MUST solve a demonstrated problem and MUST NOT be
introduced solely for theoretical extensibility.

### VI. Test-First and Automated Verification

Tests are a mandatory part of framework development.

New behavior MUST have automated verification appropriate to its scope.

The preferred development cycle is:

`RED → GREEN → REFACTOR → VERIFY`

Framework components MUST be tested at the appropriate level, including:

* unit tests for isolated logic;
* integration tests for component interactions;
* behavioral tests for commands, agents and plugins;
* configuration validation;
* end-to-end tests where runtime behavior requires them.

A change MUST NOT be considered complete solely because it compiles or
parses.

### VII. Quality Gates

A feature MUST pass applicable quality gates before being considered
complete.

Quality gates SHOULD include:

* specification consistency;
* task completeness;
* type or syntax validation;
* linting;
* automated tests;
* security checks;
* configuration validation;
* runtime verification;
* documentation verification.

The verification process MUST report failures honestly.

No agent, command, plugin or documentation MUST claim successful
verification when the relevant check was not actually executed.

### VIII. Security by Default

Security MUST be treated as a first-class framework concern.

The framework MUST:

* follow least-privilege principles for agents and tools;
* avoid exposing credentials in source files;
* use environment-based secret configuration;
* validate external inputs where applicable;
* treat shell execution as privileged behavior;
* avoid unnecessary filesystem or network access;
* provide explicit configuration for potentially dangerous integrations.

Security-sensitive functionality MUST be reviewed using established
security practices and MUST NOT rely solely on model judgment.

### IX. Least-Privilege Agents and Controlled Automation

Agents MUST receive only the permissions and tools required for their
responsibilities.

Read-only agents SHOULD remain read-only.

Agents capable of editing files, executing shell commands, modifying
Git state or interacting with external systems MUST have those
capabilities explicitly justified.

Automation MUST be predictable, observable and reversible where
practical.

Parallel agent execution MUST NOT introduce uncontrolled concurrent
modifications or ambiguous ownership of files.

### X. Modular Plugins and Hooks

OpenCode plugins and hooks MUST be modular and focused.

Lifecycle behavior MUST be implemented using OpenCode-native plugin
APIs.

The project SHOULD avoid a single monolithic hook implementation when
independent lifecycle concerns can be separated.

Hooks MUST have explicit triggering conditions and MUST avoid
surprising side effects.

Equivalent functionality MUST NOT be implemented simultaneously in
duplicated shell scripts and plugins without documented justification.

### XI. Explicit MCP Integration

MCP integrations MUST be configured explicitly.

Credentials MUST be supplied through environment variables or equivalent
secure mechanisms and MUST NOT be committed to the repository.

MCP servers MUST NOT be enabled merely because they are available.

Each enabled integration SHOULD have a documented purpose, required
permissions and expected usage.

The default configuration SHOULD minimize unnecessary external
dependencies and network access.

### XII. Memory, Learning and Context Are Non-Authoritative

Memory, session learning, checkpoints, compaction state and similar
mechanisms MUST NOT override the Constitution or feature specifications.

Persistent knowledge MUST be separated conceptually into:

* project governance;
* project documentation;
* feature specifications;
* agent/runtime state;
* learned operational information.

Learned information MUST be treated as potentially stale and MUST NOT
silently become normative project policy.

### XIII. Traceability and Convergence

Every substantial feature MUST remain traceable from requirement to
implementation.

The preferred chain is:

`Requirement → Specification → Plan → Tasks → Implementation → Verification`

Convergence MUST be used to identify discrepancies between the intended
design and the implemented system.

Missing implementation MUST result in explicit tasks rather than silent
assumptions.

Completed tasks MUST correspond to actual implemented and verified
behavior.

### XIV. Documentation Is Part of the Product

Documentation MUST evolve with framework behavior.

User-facing behavior, configuration, installation, architecture and
contribution workflows MUST be documented where applicable.

Documentation MUST NOT describe functionality that does not exist.

Examples MUST be executable or clearly marked as illustrative.

Claude Code-specific documentation MUST NOT remain in the primary
OpenCode documentation unless explicitly presented as historical/source
context.

### XV. Dependency and Complexity Discipline

The framework MUST minimize unnecessary dependencies.

Before introducing a dependency, the implementation MUST establish why
existing OpenCode, Spec Kit, Node.js or standard-library capabilities
are insufficient.

Complexity MUST be justified by concrete requirements.

The project SHOULD prefer simple, composable mechanisms over
framework-specific abstractions that provide little practical value.

### XVI. Upstream Provenance and Licensing

The project MUST preserve the provenance of functionality derived from
upstream repositories.

Before redistribution, modification or publication, the applicable
upstream license and attribution requirements MUST be reviewed.

Existing license notices MUST NOT be removed without an explicit legal
basis.

Adapted components SHOULD retain sufficient provenance information to
identify their upstream origin when appropriate.

The project MUST NOT assume that source-code availability implies
unrestricted redistribution rights.

### XVII. Compatibility and Upgradeability

The framework SHOULD minimize unnecessary coupling to undocumented or
unstable OpenCode and Spec Kit internals.

Integration points MUST be isolated where practical so that upstream
changes can be accommodated without rewriting unrelated components.

Changes to OpenCode or Spec Kit integration behavior MUST be validated
against the currently supported versions.

Compatibility assumptions MUST be documented when they materially affect
operation.

## Additional Constraints

### Architecture

The canonical project architecture separates Spec Kit artifacts from
OpenCode runtime components.

Spec Kit artifacts belong under `.specify/`.

OpenCode runtime components belong under `.opencode/`.

Source-derived material MUST NOT be placed into these areas merely for
organizational convenience; each component MUST belong to the layer
responsible for its behavior.

### Commands

Spec Kit commands MUST remain authoritative for specification-driven
development.

OpenCode commands SHOULD focus on operational workflows such as:

* TDD;
* verification;
* code review;
* security review;
* build fixing;
* E2E execution;
* refactoring;
* documentation updates;
* project-specific automation.

Duplicate functionality MUST be avoided.

### Agents

Agents MUST have explicit roles, descriptions and permission boundaries.

The framework SHOULD use specialized agents rather than a single
general-purpose agent for quality-critical workflows.

### Skills

Skills MUST describe reusable knowledge or procedures.

Skills MUST NOT silently assume Claude Code-specific tools, environment
variables or lifecycle behavior.

### Plugins

Plugins MUST use OpenCode-native APIs.

Plugin lifecycle behavior SHOULD be covered by automated tests.

### MCP

MCP configurations MUST use environment-backed secrets and SHOULD
default to disabled unless there is a documented need.

Each integration MUST have a clear purpose and expected usage scope.

## Governance

This constitution is the authoritative governance document for the
Everything OpenCode + Spec Kit framework.

All pull requests, code reviews and verification processes MUST check
compliance with these principles.

Amendments to this constitution require:

* a written change rationale;
* version increment following semantic versioning;
* updated traceability to affected specifications and tasks.

Runtime development guidance is maintained separately from governance
and MUST NOT override these principles.

**Version**: 1.0.0 | **Ratified**: 2026-09-20 | **Last Amended**: 2026-09-20
