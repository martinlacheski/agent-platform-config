---
name: fastapi-alembic-workflow
description: Canonical Alembic migration workflow for FastAPI + SQLModel projects. Trigger: When schema changes require safe, reviewable, and repeatable migrations.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use
- Any SQLModel schema change that affects tables, constraints, or indexes.
- Teams needing predictable migration generation and review from repo root.

## Critical Patterns
- Use canonical Alembic layout at repository root (`alembic.ini`, `alembic/`).
- Generate revisions after model updates, then review and edit manually.
- Keep migrations forward-only and deterministic; avoid data-destructive defaults.
- Include downgrade steps when project policy requires reversibility.
- Run migration checks in CI (`upgrade head` on clean database).
- Do not couple migrations to environment-specific database vendor features.

## Workflow Checklist
- Update SQLModel models and metadata imports.
- Run autogenerate revision from repo root.
- Review operations (names, nullability, indexes, constraints).
- Add explicit data backfill step when required.
- Run local `upgrade head` then app tests.
- Open PR with migration rationale and rollback notes.

## Code Examples
```python
# alembic/env.py (metadata wiring)
from sqlmodel import SQLModel
target_metadata = SQLModel.metadata
```

```python
# example manual migration tweak
def upgrade() -> None:
    op.add_column("widget", sa.Column("slug", sa.String(length=64), nullable=True))
    op.create_unique_constraint("uq_widget_slug", "widget", ["slug"])
```

## Commands
- `alembic revision --autogenerate -m "describe schema change"`
- `alembic upgrade head`
- `alembic downgrade -1`
- `pytest -q`
