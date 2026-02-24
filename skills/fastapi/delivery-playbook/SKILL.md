---
name: fastapi-delivery-playbook
description: Meta-skill to orchestrate FastAPI delivery by loading the right implementation skills for each request. Trigger: When planning or executing FastAPI work that may span architecture, CRUD, permissions, webhooks, testing, and migrations.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use
- Coordinating FastAPI delivery where multiple concerns (API, data, authz, tests, migrations) may change together.
- Routing incoming requests to the correct skill set before writing code.
- Enforcing one delivery standard across modules and contributors.

## Routing Matrix
| Request type | Load skills | Decision rule |
| --- | --- | --- |
| New CRUD module | `fastapi-crud-module`, `fastapi-permissions-registry`, `fastapi-testing-pytest`, `fastapi-alembic-workflow` | `fastapi-crud-module` includes architecture guardrails; include permissions, tests, and migrations by default for new entities. |
| Auth change | `fastapi-permissions-registry`, `fastapi-testing-pytest` (+ `fastapi-crud-module` if service boundaries shift) | If only permission wiring changes, keep scope to registry + tests; if logic moves across layers, add CRUD module guardrails. |
| Webhook/event feature | `fastapi-webhooks-events`, `fastapi-crud-module`, `fastapi-testing-pytest`, `fastapi-alembic-workflow` (+ `fastapi-permissions-registry` if protected endpoints) | Start from webhook reliability patterns; add CRUD module guardrails for layer boundaries; add migration for event persistence; add permissions only when authz is involved. |
| Migration-only change | `fastapi-alembic-workflow`, `fastapi-testing-pytest` | Load only migration + verification unless request also changes runtime logic. |
| Bugfix touching multiple layers | `fastapi-crud-module`, `fastapi-testing-pytest` + targeted skill(s): `fastapi-permissions-registry`/`fastapi-webhooks-events`/`fastapi-alembic-workflow` | Use CRUD module guardrails to restore boundaries, then load only impacted domain skills; tests are mandatory. |

## Delivery Workflow
- Load selected skills from the matrix before code edits.
- Enforce architecture baseline: `router -> service -> repository` only.
- Use SQLModel as the persistence baseline and keep schema/model contracts explicit.
- Keep permissions centralized in `core/permissions.py`; never leave module-only permission strings unregistered.
- Keep Alembic canonical at repository root (`alembic.ini`, `alembic/`); generate and review revisions from root.
- Add/adjust tests for changed layers (router, service, repository, permissions, migration behavior).

## Definition of Done
- Correct skills were loaded per request type and scope did not drift.
- Layering is clean (`router -> service -> repository`) with no cross-layer leakage.
- SQLModel models/schemas and repository/service behavior are consistent.
- Permission changes are reflected in `core/permissions.py` and enforced at route boundaries.
- Required Alembic revision exists and upgrades cleanly from repo root.
- Pytest coverage includes happy path and failure path for changed behavior.

## Anti-Patterns
- Writing business rules in routers or SQL/query code in services.
- Introducing non-SQLModel persistence patterns without explicit requirement.
- Duplicating permission literals across modules without registry updates.
- Running ad-hoc migration scripts outside root-level Alembic workflow.
- Fixing multi-layer bugs without adding regression tests.

## Commands
- `rg "APIRouter|Depends\(|require_permissions|SQLModel" app`
- `rg "router -> service -> repository|core/permissions.py|alembic" -g "*.md"`
- `pytest -q`
- `pytest -m "integration or api" -q`
- `alembic revision --autogenerate -m "describe schema change"`
- `alembic upgrade head`
