# FastAPI Layout and Naming Conventions

Recommended module structure:

```text
app/modules/<domain>/
  models.py
  schemas.py
  repository.py
  service.py
  router.py
  permissions.py
```

Naming conventions:

- Module folder: singular or domain term (for example, `widget`, `billing`).
- Router variable: `router`; service class: `<Domain>Service`; repository class: `<Domain>Repository`.
- Permission keys: `<domain>.<action>` (for example, `widget.read`, `widget.write`).
- Migration message: imperative and scoped (for example, `add widget table`).
- Test files: `test_<domain>_router.py`, `test_<domain>_service.py`, `test_<domain>_repository.py`.

Layer rule:

- Only `router -> service -> repository` dependency flow is allowed.
