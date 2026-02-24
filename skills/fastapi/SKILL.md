---
name: fastapi
description: Unified FastAPI skill package that routes work to specialized FastAPI subskills. Trigger: When planning or implementing FastAPI backend work and deciding which FastAPI subskills to load.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
  scope: [backend, api]
  auto_invoke: "Creating/modifying FastAPI endpoints, services, repositories, permissions, tests, or Alembic migrations"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, Task
---

## When to Use
- Starting any FastAPI backend request where scope may span architecture, CRUD, permissions, migrations, testing, or webhooks.
- Selecting the smallest FastAPI subskill set needed before implementation.
- Keeping FastAPI guidance centralized while preserving specialized skill ownership.

## Auto-invoke Signals
- Creating or modifying FastAPI routers/endpoints.
- Implementing SQLModel entities, repositories, or service-layer rules.
- Adding or changing authorization and permission wiring.
- Creating webhook/event ingestion flows.
- Writing FastAPI tests with pytest.
- Generating or reviewing Alembic migrations.

## Skill Routing Matrix
| Request intent | Load subskill(s) |
| --- | --- |
| Build/refactor module architecture | `fastapi-crud-module` (includes architecture guardrails) |
| Implement CRUD module | `fastapi-crud-module` |
| Add/update permissions | `fastapi-permissions-registry` |
| Build webhook/event flows | `fastapi-webhooks-events` |
| Write/expand tests | `fastapi-testing-pytest` |
| Create/review migrations | `fastapi-alembic-workflow` |
| Coordinate multi-concern delivery | `fastapi-delivery-playbook` |

## Package Layout
- `fastapi/SKILL.md`: Umbrella router skill for the FastAPI suite.
- `fastapi/crud-module/SKILL.md`: Reusable CRUD module blueprint with architecture guardrails.
- `fastapi/permissions-registry/SKILL.md`: Shared permission naming and enforcement.
- `fastapi/webhooks-events/SKILL.md`: Reliable webhook ingestion and event handling.
- `fastapi/testing-pytest/SKILL.md`: FastAPI-oriented pytest strategy.
- `fastapi/alembic-workflow/SKILL.md`: Safe migration workflow.
- `fastapi/delivery-playbook/SKILL.md`: Cross-cutting delivery orchestration.
- `fastapi/assets/`: Templates and operational checklists.
- `fastapi/references/`: Local conventions and documentation pointers.

## Quick Start
1. Load `fastapi` to classify the request.
2. Pick one primary subskill from the routing matrix.
3. Add at most two support subskills when scope clearly spans concerns.
4. Execute work with subskill guidance and keep module boundaries explicit.
