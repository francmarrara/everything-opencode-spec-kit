# Spec-Driven Development Workflow

This document describes how OpenCode operational commands complement Spec Kit SDD commands without duplication.

## Spec Kit Commands (Governance Layer)

These commands live in `.specify/` and handle specification, planning, and analysis:

| Command | Purpose | Output |
|---------|---------|--------|
| `/speckit.constitution` | Ratify or amend project constitution | `.specify/memory/constitution.md` |
| `/speckit.specify` | Create feature specification | `specs/<id>/spec.md` |
| `/speckit.clarify` | Resolve ambiguities in spec | Updated `spec.md` |
| `/speckit.plan` | Generate implementation plan | `specs/<id>/plan.md` |
| `/speckit.tasks` | Decompose into executable tasks | `specs/<id>/tasks.md` |
| `/speckit.analyze` | Check consistency across artifacts | Analysis report |
| `/speckit.converge` | Verify implementation matches spec | Updated `tasks.md` |

## OpenCode Commands (Runtime Layer)

These commands live in `.opencode/` and handle development operations:

| Command | Purpose | Does NOT duplicate |
|---------|---------|-------------------|
| `/tdd` | Test-driven development workflow | Spec Kit planning |
| `/code-review` | Security and quality review | Spec Kit analysis |
| `/e2e` | End-to-end test generation | Spec Kit verification |
| `/verify` | Build/type/lint/test verification | Spec Kit convergence |
| `/build-fix` | Incremental build error fixing | Spec Kit planning |
| `/orchestrate` | Multi-agent workflow | Spec Kit governance |
| `/checkpoint` | Workflow state snapshots | Spec Kit tasks |
| `/learn` | Pattern extraction | Spec Kit specification |
| `/eval` | Eval-driven development | Spec Kit convergence |

## Separation Rules

1. **Spec Kit defines WHAT** — requirements, success criteria, architecture
2. **OpenCode defines HOW** — implementation, testing, review, deployment
3. **No competing `/plan`** — OpenCode must not duplicate `/speckit-plan`
4. **Traceability** — Every task traces to a spec requirement
5. **Convergence** — `/speckit.converge` validates implementation against spec

## Workflow Integration

```
Developer asks: "Add feature X"
         │
         ▼
┌─────────────────────┐
│  Spec Kit Layer      │
│  /speckit.specify    │──→ spec.md
│  /speckit.plan       │──→ plan.md
│  /speckit.tasks      │──→ tasks.md
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│  OpenCode Layer      │
│  /tdd                │──→ implement tasks
│  /code-review        │──→ validate quality
│  /verify             │──→ verify gates
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│  Convergence         │
│  /speckit.converge   │──→ remaining tasks
└─────────────────────┘
```
