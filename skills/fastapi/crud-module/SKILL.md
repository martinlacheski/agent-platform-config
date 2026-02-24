---
name: fastapi-crud-module
description: Reusable FastAPI CRUD module template using SQLModel with built-in architecture guardrails. Trigger: When implementing or refactoring domain modules with list/get/create/update/delete endpoints.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use
- Shipping a new business entity quickly with stable CRUD defaults.
- Replacing ad-hoc endpoints with a consistent module shape.

## Critical Patterns
- Enforce dependency flow: `router -> service -> repository` only.
- Keep routers thin: validate input, enforce permissions, map domain errors to HTTP responses.
- Keep services for business orchestration and transaction boundaries; no raw SQL or HTTP concerns.
- Keep repositories for data access only; no business branching.
- Module layout: `models.py`, `schemas.py`, `repository.py`, `service.py`, `router.py`.
- Use SQLModel models for persistence and explicit create/update/read schemas.
- Keep pagination/filter parsing in router, but apply query building in repository.
- Use explicit transaction boundaries in service (`commit`/`rollback` once per use case).
- Return deterministic domain errors (`NotFound`, `Conflict`, `ValidationError`).
- Support idempotent update semantics (`PATCH` partial updates, conflict-safe checks).
- Use soft-delete only when product rules require audit/history retention.
- Do not expose internal fields (`deleted_at`, internal flags) in response schema.

## Workflow Checklist
- Define SQLModel entity and Pydantic/SQLModel API schemas.
- Implement repository methods: `list`, `get_by_id`, `create`, `update`, `delete`.
- Implement service rules: uniqueness, state transitions, invariants.
- Add router endpoints with permission checks and clear status codes.
- Add module tests for happy path + failure path.
- Add migration and verify local upgrade.

## Code Examples
```python
# router.py
@router.post("/widgets", response_model=WidgetRead, status_code=201)
def create_widget(payload: WidgetCreate, service: WidgetService = Depends(get_widget_service)):
    return service.create_widget(payload)
```

```python
# service.py
class WidgetService:
    def update_widget(self, widget_id: int, payload: WidgetUpdate) -> Widget:
        widget = self.repo.get_by_id(widget_id)
        if not widget:
            raise NotFoundError("widget not found")
        if payload.name and self.repo.name_taken(payload.name, exclude_id=widget_id):
            raise ConflictError("widget name already exists")
        updated = self.repo.update(widget, payload)
        self.session.commit()
        self.session.refresh(updated)
        return updated
```

```python
# repository.py
class WidgetRepository:
    def exists_by_name(self, name: str) -> bool:
        stmt = select(Widget).where(Widget.name == name)
        return self.session.exec(stmt).first() is not None
```

```python
@router.get("/widgets", response_model=Page[WidgetRead])
def list_widgets(params: PaginationParams = Depends(), service: WidgetService = Depends(get_widget_service)):
    return service.list_widgets(params)
```

## Commands
- `pytest tests/modules/widgets -q`
- `ruff check app/modules/widgets`
- `alembic revision --autogenerate -m "add widgets module"`
- `alembic upgrade head`
