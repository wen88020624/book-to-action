# Frontend Project — CLAUDE.md

> Copy this file to your frontend project root as `CLAUDE.md`.

## Tech Stack

- React 19 + Next.js 15
- pnpm
- Biome (linting + formatting — not ESLint/Prettier)
- Joy UI (UI components)
- SCSS (styling)

Reference: `package.json`, `biome.json`

---

## File Structure Contract

New pages live under `src/app`. Every new page folder has exactly **three files**:

| File | Responsibility |
|---|---|
| `page.jsx` | Route entry + page shell only. No business logic. |
| `content.jsx` | Client logic, hooks, dispatch, component assembly. |
| `page.module.scss` | Page-scoped styles. |

`page.scss` files in existing code are legacy — do not use for new development.

---

## Data Flow Contract (Redux + Saga)

Components dispatch actions only — **never call axios directly**.

```
Component dispatch → saga → fetchApi → reducer
```

- Check `swagger.json` before wiring any new API endpoint.
- Reuse existing API constants and saga patterns wherever possible.
- `loading` state, token injection, and error handling stay inside Redux/Saga — not in components.

Reference: `swagger.json`, `src/redux/saga/index.jsx`, `src/redux/api/API.jsx`, `src/redux/api/apiService.jsx`

---

## Form Contract

- Forms use `react-hook-form`.
- Joy UI inputs integrate via `Controller`.
- Check `src/components/new-forms` first — reuse existing field components before creating new ones.
- Field error messages display below the field in red.
- Validation rules and schemas go into shared `rule` / `schema` / helper files — not inline in components.

Reference: `src/components/new-forms/form-field.jsx`, `src/components/new-forms/select-field.jsx`

---

## State Management

| Situation | Tool |
|---|---|
| Cross-page, server-driven, or multi-consumer state | Redux |
| Complex local state within a single page | useImmer |

Do not use `useImmer` as a substitute for global state.

---

## Styling

- New page styles → `page.module.scss` only.
- Shared variables → import from `src/styles/variables.module.scss`.
- Keep styles page-scoped — no global pollution.
- Match Joy UI design language: spacing, border-radius, shadow, color scale, component hierarchy.

Reference: `src/app/forbidden/page.module.scss`, `src/styles/variables.module.scss`

---

## Component Organization

- Reusable components → `src/components`.
- One component per file.
- Follow the export pattern in `src/components/index.jsx`.
- Max ~500 lines per file — split into hooks, utils, and subcomponents before hitting the limit.

---

## Conventions

- **Import aliases**: `@/`, `@components`, `@hooks/*`, `@redux/*`, `@utils/*`
- **Redux hooks**: `useDispatch` / `useSelector` from `@react-redux`
- **Action type naming**: `UPPER_SNAKE_CASE` — e.g. `FETCH_SUTS`, `CREATE_SUT`, `SET_API_ERROR`
- **Saga watchers**: `takeLatest` for queries/pagination · `takeEvery` for create/update/delete
- Stay in JSX ecosystem — do not introduce unnecessary new abstractions.

Reference: `jsconfig.json`, `src/hooks/use-redux.jsx`, `src/redux/saga/project.jsx`

---

## Output Rules

- UI copy in **English only**.
- No extra documentation unless explicitly requested.
- Comments only for non-obvious logic.
- Changes stay scoped — no unrelated modifications.

---

## Auth / Cookie Rules

- Cookie path: `/`
- Do not bypass existing auth / session / provider architecture.

Reference: `src/app/layout.jsx`

---

## Do / Don't

**Do:**
- Three-file contract for every new page (`page.jsx` / `content.jsx` / `page.module.scss`)
- `react-hook-form` + existing `new-forms` components
- All API calls through Redux/Saga pipeline
- `page.module.scss` for all new page styles
- Match Joy UI style system for visual consistency
- `@`-alias imports + existing action naming patterns

**Don't:**
- Call axios directly in components or pages
- Use `page.scss` for new features
- Bypass provider or permission checks
- Use non-English UI copy

---

## Evolving This Document

When a new reusable pattern, architectural convention, or process rule emerges during development, ask before adding it. If confirmed, add it to the relevant section so it applies automatically going forward.
