---
name: fastapi-permissions-registry
description: Centralized permission registry and FastAPI enforcement convention. Trigger: When adding or changing authz rules across modules with a shared permissions catalog.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use
- Establishing a single source of truth for permission names.
- Preventing duplicated string literals and drift across modules.

## Critical Patterns
- Each module defines local permissions (constants/enum).
- `core/permissions.py` imports and aggregates all module permissions.
- Routers enforce permissions at entry points via reusable dependency guards.
- Services can perform contextual checks only (ownership, state), not identity policy.
- Permission identifiers are stable and namespaced (example: `widget.read`, `widget.write`).

## Workflow Checklist
- Add new module permission constants.
- Register them in `core/permissions.py` aggregate.
- Wire route-level checks for each endpoint.
- Add tests for allow/deny behavior and missing-scope responses.
- Update docs or OpenAPI security notes if applicable.

## Code Examples
```python
# modules/widget/permissions.py
WIDGET_READ = "widget.read"
WIDGET_WRITE = "widget.write"
```

```python
# core/permissions.py
from app.modules.widget.permissions import WIDGET_READ, WIDGET_WRITE

ALL_PERMISSIONS = {
    WIDGET_READ,
    WIDGET_WRITE,
}
```

```python
@router.post("/widgets", dependencies=[Depends(require_permissions("widget.write"))])
def create_widget(...):
    ...
```

## Commands
- `pytest tests/authz -q`
- `rg "require_permissions" app/modules`
- `python -m app.scripts.check_permissions_registry`
