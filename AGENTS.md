# Global AGENTS Router

This is a global intent router for OpenCode skills. Goal: load only the minimum skill set needed for the current task.

Use this file across repositories by linking it into each project root:

```bash
~/.config/opencode/scripts/link-global-agents.sh
```

You can keep one source of truth globally and expose it per project as `AGENTS.md` via symlink.

## 1) Routing Principles

- Load the fewest skills that can solve the task end-to-end.
- Prefer the most specific domain skill over broad/general skills.
- Add cross-cutting skills only when needed (testing, architecture, PR workflow).
- For multi-part work, load one primary skill plus optional support skills.
- If framework/version is unclear, start with neutral workflow skill, then specialize.

## 2) Quick Intent -> Skill Matrix

| Intent | Primary skill(s) | Optional support |
|---|---|---|
| Build/extend FastAPI service | `fastapi` | `pytest` |
| FastAPI migrations/schema changes | `fastapi` | `pytest` |
| FastAPI permissions/RBAC | `fastapi` | `pytest` |
| FastAPI event/webhook flows | `fastapi` | `pytest` |
| FastAPI test strategy | `fastapi` | `pytest` |
| Angular architecture/layout decisions | `angular-architecture` | `angular-core`, `angular-performance` |
| Angular components/signals/control flow | `angular-core` | `angular-forms`, `angular-performance` |
| Angular forms/validation | `angular-forms` | `angular-core` |
| Angular performance/lazy loading/SSR | `angular-performance` | `angular-architecture` |
| React app/component work | `react-19` | `typescript`, `tailwind-4`, `zustand-5`, `ai-sdk-5`, `shadcn-custom` |
| React Native mobile work | `react-native` | `typescript` |
| Next.js App Router work | `nextjs-15` | `react-19`, `tailwind-4`, `ai-sdk-5`, `zod-4`, `typescript`, `shadcn-custom` |
| Custom UI & Shadcn | `shadcn-custom` | `react-19`, `tailwind-4` |
| AI chat/product features | `ai-sdk-5` | `nextjs-15`, `react-19`, `zod-4` |
| Tailwind styling/system tokens | `tailwind-4` | `react-19`, `nextjs-15` |
| Zod schema validation | `zod-4` | `typescript` |
| Zustand state management | `zustand-5` | `react-19`, `typescript` |
| Playwright E2E testing | `playwright` | domain skill under test |
| Python tests (non-FastAPI specific) | `pytest` | domain skill under test |
| Django REST API work | `django-drf` | `pytest` |
| Spring Boot 3 service work | `spring-boot-3` | `java-21`, `hexagonal-architecture-layers-java` |
| Java language/runtime patterns | `java-21` | `spring-boot-3` |
| Java clean/hexagonal layering | `hexagonal-architecture-layers-java` | `spring-boot-3` |
| Electron desktop app work | `electron` | `react-19`, `typescript` |
| Elixir/Phoenix code review/refactor | `elixir-antipatterns` |  |
| Create Jira task | `jira-task` |  |
| Create Jira epic | `jira-epic` |  |
| Create PR / PR description | `github-pr` |  |
| Create a new skill | `skill-creator` |  |

## 3) Domain Bundles

- `fastapi-core`: `fastapi-crud-module` + `fastapi-testing-pytest`.
- `fastapi-delivery`: `fastapi-delivery-playbook` + `fastapi-alembic-workflow` + `fastapi-webhooks-events`.
- `fastapi-suite`: `fastapi` + `fastapi-core` + `fastapi-delivery` + `fastapi-permissions-registry`.
- `angular-full`: `angular-architecture` + `angular-core` + `angular-forms` + `angular-performance`.
- `next-react-fullstack`: `nextjs-15` + `react-19` + `typescript` + `zod-4` + `tailwind-4`.
- `java-service`: `spring-boot-3` + `java-21` + `hexagonal-architecture-layers-java`.
- `quality-gate`: `playwright` or `pytest` + primary domain skill.
- `planning-delivery`: `jira-task`/`jira-epic` + `github-pr`.

## 4) Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill first:

| Action | Skill |
|---|---|
| Creating/modifying FastAPI endpoints, services, repositories, permissions, tests, or Alembic migrations | `fastapi` |
| Creating ViewSets, serializers, or filters in Django API | `django-drf` |
| Writing Python tests with pytest | `pytest` |
| Writing Playwright E2E tests | `playwright` |
| Writing React components | `react-19` |
| App Router / Server Actions in Next.js | `nextjs-15` |
| Building AI chat/product features | `ai-sdk-5` |
| Creating Zod schemas | `zod-4` |
| Using Zustand stores | `zustand-5` |
| Working with Tailwind classes | `tailwind-4` |
| Using/Adding Shadcn components | `shadcn-custom` |
| Creating Jira task | `jira-task` |
| Creating Jira epic | `jira-epic` |
| Creating PR / PR description | `github-pr` |
| Creating or modifying a skill | `skill-creator` |

## 5) Conflict / Precedence Rules

- Specific beats general (example: `angular-forms` over `angular-core` for form-state decisions).
- Versioned framework guidance beats generic patterns (example: `nextjs-15` over plain React routing assumptions).
- Architecture skills set boundaries; implementation skills fill details inside those boundaries.
- Testing skills govern test structure/assertion style, not business architecture.
- If two skills disagree, follow: framework/version skill -> domain architecture skill -> implementation skill -> tooling workflow skill.

## 6) Default Fallback Flow

1. Classify task: platform (web/mobile/backend), framework, and delivery stage (build/test/release).
2. Load one primary skill from the matrix.
3. Add up to two support skills only if the task clearly spans them.
4. Execute and re-evaluate only when blocked by missing guidance.
5. If no direct match, use closest architecture skill + relevant test skill, then proceed with repo conventions.
