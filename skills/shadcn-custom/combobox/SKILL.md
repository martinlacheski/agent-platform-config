---
name: shadcn-custom-combobox
description: Searchable Select / Combobox component for Shadcn UI. Trigger: When user asks for a searchable dropdown, select with search, autocomplete, or combobox.
---

# Shadcn Custom Combobox & Search Selector

This skill provides an advanced Search Selector and Combobox built on top of Shadcn UI `Command` and `Popover`.

## Assets Included
Located in `skills/shadcn-custom/combobox/assets/`:
- `Combobox.tsx` (Searchable select component)
- `SearchSelector.tsx` (Advanced selector with search capabilities, export features, etc.)

## Instructions
1. The user wants to add a searchable dropdown/combobox.
2. Read the components from the assets directory in this skill.
3. Place them in `src/components/custom/Combobox.tsx` or `SearchSelector.tsx`.
4. The Combobox relies on `@radix-ui/react-popover` and `@radix-ui/react-command` (Shadcn UI `command`, `popover`, `button`, `badge`). Install them if not present.

## Dependencies to Install
```bash
npm install lucide-react cmdk
npx shadcn@latest add command popover button badge
```

## Usage Notes
- `Combobox` provides standard searchable select functionality with `value` and `onChange`.
- `SearchSelector` is an advanced component that may include searching capabilities combined with external features like PDF/Excel export triggers depending on the project. Read the asset source code before implementing.
