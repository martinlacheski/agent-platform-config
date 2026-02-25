---
name: shadcn-custom-core-ui
description: Base Shadcn UI components. Trigger: When user asks to add standard Shadcn UI components but CLI is failing, or when we want to ensure we are using the exact versions stored in our custom skill library.
---

# Shadcn Custom Core UI

This skill provides the baseline Shadcn UI components that have been previously installed and verified to work with our `index.css` Tailwind v4 configuration.

## Assets Included
Located in `skills/shadcn-custom/core-ui/assets/`:
- Contains all standard Shadcn UI `.tsx` component files (e.g., `button.tsx`, `input.tsx`, `dialog.tsx`, `table.tsx`, etc.).

## Instructions
1. Best Practice: Prefer using `npx shadcn@latest add <component>` so the CLI can handle dependencies (like `@radix-ui/react-*`).
2. **Fallback / Override**: If the CLI fails, if the project requires offline installation, or if the user explicitly asks to use our stored versions instead of the CLI, read the requested component from this subskill's `assets/` directory.
3. Place the component in `src/components/ui/`.
4. **Important**: Always verify the `import` statements at the top of the file. You may need to manually install the corresponding Radix UI primitive (e.g., `npm install @radix-ui/react-dialog`) or `lucide-react`.

## Common Dependencies
```bash
npm install lucide-react class-variance-authority
```
