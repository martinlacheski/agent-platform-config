# FastAPI Module Checklist

Use this checklist when adding a new FastAPI module.

- [ ] Define SQLModel entity and API schemas (`Create`, `Update`, `Read`).
- [ ] Implement `repository.py` with focused query methods.
- [ ] Implement `service.py` with business rules and transaction boundary.
- [ ] Implement `router.py` with validation, permissions, and HTTP mapping.
- [ ] Register permission constants in shared registry.
- [ ] Add migration (`alembic revision --autogenerate`) and review manually.
- [ ] Add tests for router contract, service rules, and repository behavior.
- [ ] Document new endpoints and operational notes.
