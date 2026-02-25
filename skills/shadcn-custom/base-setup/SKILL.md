---
name: shadcn-custom-base-setup
description: Core Shadcn UI styles, Tailwind config, and utility functions. Trigger: When setting up Shadcn UI in a new project or modifying global CSS variables and colors.
---

# Shadcn Custom Base Setup

This skill provides the base configuration, CSS variables, and utility functions for Shadcn UI components.

## Assets Included
- `index.css`: Contains the CSS variables for the color palette, dark mode support, and base Tailwind styles.
- `utils.ts`: Contains the `cn` utility function and `formatDate` utilities.
- `components.json`: Configuration for the Shadcn UI CLI.

## Instructions
1. When asked to set up Shadcn UI base styles, read the contents of the assets in `skills/shadcn-custom/base-setup/assets/`.
2. Determine the project framework:
   - For **Vite**, copy `index.css` to `src/index.css`.
   - For **Next.js**, copy `index.css` to `app/globals.css` (or `src/app/globals.css`).
3. Ensure `@tailwindcss/vite` (or `@tailwindcss/postcss` for Next.js) and `tailwindcss` (v4) are installed, as `index.css` uses Tailwind v4 `@theme` block.
4. Copy `utils.ts` to `src/lib/utils.ts`.
5. Add `clsx` and `tailwind-merge` as dependencies if not present.
6. Verify `components.json` structure aligns with the project (paths might need adjustments like `src/components/ui`).

## Dependencies to Install
```bash
npm install clsx tailwind-merge
npm install -D @tailwindcss/vite tailwindcss
```
