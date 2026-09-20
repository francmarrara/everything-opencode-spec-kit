# Data Model: OpenCode + Spec Kit Framework Migration

**Date**: 2026-09-20
**Feature**: 001-opencode-framework-migration

## Entities

### Agent

**Purpose**: Specialized autonomous unit with defined role and permissions.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | yes | Unique identifier (e.g., "tdd-guide") |
| description | string | yes | Human-readable role description |
| tools | list[string] | yes | Tool access permissions (least-privilege) |
| model | string | no | Model preference (if OpenCode supports) |
| system_prompt | markdown | yes | Agent instructions and behavior |
| permissions | object | no | Explicit permission boundaries |

**Validation Rules**:
- name MUST be unique across all agents
- tools MUST only contain OpenCode-verified tool names
- system_prompt MUST NOT reference Claude Code-specific mechanisms
- permissions MUST follow least-privilege principle

**Relationships**:
- Agent may be invoked by Command
- Agent may delegate to other Agents (if supported)
- Agent MUST have exactly one clear responsibility

### Skill

**Purpose**: Reusable knowledge or procedure for domain-specific tasks.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | yes | Unique identifier |
| description | string | yes | What the skill provides |
| content | markdown | yes | Knowledge/procedure content |
| tools | list[string] | no | Tools the skill may reference |
| dependencies | list[string] | no | Other skills or resources needed |

**Validation Rules**:
- content MUST NOT assume specific runtime tools unless documented
- content MUST NOT reference Claude Code-specific paths or APIs
- content MUST be self-contained or explicitly declare dependencies

**Relationships**:
- Skill may be referenced by Command
- Skill may be referenced by Agent
- Skill MUST NOT overlap with Constitution or spec responsibilities

### Command

**Purpose**: Operational slash command that triggers a workflow.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | yes | Command identifier (e.g., "tdd") |
| description | string | yes | What the command does |
| content | markdown | yes | Command instructions |
| agent | string | no | Agent to delegate to |
| arguments | string | no | Argument specification |

**Validation Rules**:
- name MUST NOT duplicate Spec Kit commands (/speckit.*)
- content MUST NOT reference Claude Code-specific paths
- agent reference MUST exist in .opencode/agents/

**Relationships**:
- Command may invoke Agent
- Command may reference Skill
- Command MUST NOT duplicate Spec Kit functionality

### Plugin

**Purpose**: OpenCode-native lifecycle extension.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | yes | Plugin identifier |
| description | string | yes | What the plugin does |
| lifecycle | list[string] | yes | Lifecycle events handled |
| implementation | file | yes | Plugin code |
| tests | list[file] | no | Plugin tests |

**Validation Rules**:
- MUST use OpenCode-native plugin API
- MUST have explicit triggering conditions
- MUST NOT have surprising side effects
- SHOULD have automated tests

**Relationships**:
- Plugin handles Hook events
- Plugin MUST NOT duplicate functionality of another Plugin

### Hook

**Purpose**: Triggered automation on specific events.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| event | string | yes | Lifecycle event name |
| matcher | string | no | Condition for execution |
| handler | string | yes | Command or plugin to execute |
| description | string | yes | What the hook does |

**Validation Rules**:
- event MUST be an OpenCode-supported lifecycle event
- handler MUST exist and be executable
- MUST NOT have surprising side effects
- MUST have explicit triggering conditions

**Relationships**:
- Hook fires on Plugin lifecycle event
- Hook may call external script

### MCP Integration

**Purpose**: Model Context Protocol server connection.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | yes | Server identifier |
| description | string | yes | Purpose and usage |
| command | string | no | Server command (stdio transport) |
| url | string | no | Server URL (HTTP transport) |
| env | object | yes | Environment variables (secrets) |
| enabled | boolean | no | Default enabled state (default: false) |

**Validation Rules**:
- MUST NOT contain hardcoded credentials
- MUST use environment variable references for secrets
- SHOULD default to disabled unless documented need
- MUST have documented purpose and usage scope

**Relationships**:
- MCP Integration provides tools to Agents
- MCP Integration MUST be explicitly enabled

### Rule

**Purpose**: Guideline classified by governance level.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | yes | Rule identifier |
| classification | enum | yes | constitutional, runtime, skill-specific, obsolete |
| content | markdown | yes | Rule content |
| location | string | yes | Target file path |

**Classification Mapping**:
- constitutional -> .specify/memory/constitution.md (already there)
- runtime -> .opencode/instructions/
- skill-specific -> .opencode/skills/<skill>/
- obsolete -> removed or archived

**Validation Rules**:
- MUST NOT be duplicated across layers
- classification MUST determine target location
- content MUST NOT reference Claude Code-specific mechanisms

### Specification

**Purpose**: Feature specification in .specify/ defining WHAT the system must do.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | yes | Feature identifier |
| directory | path | yes | specs/<name>/ |
| spec_file | path | yes | specs/<name>/spec.md |
| plan_file | path | no | specs/<name>/plan.md |
| tasks_file | path | no | specs/<name>/tasks.md |

**Validation Rules**:
- MUST follow Spec Kit template structure
- MUST be traceable to implementation tasks
- MUST comply with Constitution

### Constitution

**Purpose**: Authoritative governance document.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| version | string | yes | Semantic version |
| ratified | date | yes | Adoption date |
| last_amended | date | yes | Last modification date |
| principles | list[object] | yes | Core principles |
| constraints | list[object] | yes | Additional constraints |

**Validation Rules**:
- MUST be at .specify/memory/constitution.md
- version MUST increment on amendment
- ALL components MUST comply
