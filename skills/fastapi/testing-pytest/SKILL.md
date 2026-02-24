---
name: fastapi-testing-pytest
description: FastAPI + SQLModel testing strategy with pytest for stable and fast feedback. Trigger: When adding tests for routers, services, repositories, and permission flows.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use
- Creating or expanding test coverage around FastAPI modules.
- Preventing regressions in permissions, business rules, and data access logic.

## Critical Patterns
- Test pyramid by layer: repository (query correctness), service (business rules), router (contract/authz).
- Use isolated test DB per session and rollback/cleanup per test.
- Prefer fixtures for app factory, authenticated clients, and seeded entities.
- Mock external integrations at service boundary, not deep inside repositories.
- Assert status code + payload shape + side effects (DB state/events).
- Keep tests deterministic: fixed timestamps/UUIDs where assertions depend on them.

## Workflow Checklist
- Configure `pytest.ini` markers (`unit`, `integration`, `api`).
- Build shared fixtures for session, client, user scopes, and factories.
- Add happy-path and failure-path tests per endpoint.
- Add service tests for validation/conflict/not-found logic.
- Add repository tests for filters, pagination, and edge cases.
- Ensure CI command runs quickly and fails loudly.

## Code Examples
```python
def test_create_widget_denies_without_scope(client):
    response = client.post("/widgets", json={"name": "alpha"})
    assert response.status_code == 403
```

```python
def test_create_widget_service_conflict(service, widget_factory):
    widget_factory(name="alpha")
    with pytest.raises(ConflictError):
        service.create_widget(WidgetCreate(name="alpha"))
```

## Commands
- `pytest -q`
- `pytest -m unit -q`
- `pytest -m "integration or api" -q`
- `pytest --maxfail=1 --disable-warnings`
