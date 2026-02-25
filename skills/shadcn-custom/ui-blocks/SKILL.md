---
name: shadcn-custom-ui-blocks
description: Reusable UI block components like Breadcrumbs, FullScreenLoading, and layout utilities. Trigger: When user asks for navigation breadcrumbs, full-page loading screens, or structural layout utilities.
---

# Shadcn Custom UI Blocks

This skill provides essential UI structural blocks that are often repeated across projects but require specific styling and behavior to feel native to Shadcn UI.

## Assets Included
Located in `skills/shadcn-custom/ui-blocks/assets/`:
- `Breadcrumbs.tsx` (Dynamic navigation breadcrumbs)
- `FullScreenLoading.tsx` (Overlay spinner/loader)

## Instructions
1. When asked for breadcrumb navigation or full-screen loading spinners, read the components from the assets directory in this skill.
2. Place them in `src/components/custom/`.
3. The Breadcrumbs component typically relies on `react-router` (or `react-router-dom`) or `next/link`. You must check the source file and adapt the routing imports (`Link`, `useLocation` vs `usePathname`) based on the target framework (Next.js vs Vite/React).

## Dependencies to Install
```bash
npm install lucide-react
npx shadcn@latest add breadcrumb spinner # (If you have a custom spinner, use the one provided or Lucide's Loader)
```
