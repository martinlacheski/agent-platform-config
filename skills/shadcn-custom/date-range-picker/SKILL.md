---
name: shadcn-custom-date-range-picker
description: Advanced Date Range Picker component for Shadcn UI. Trigger: When user asks for a date range picker, calendar, or date selection component.
---

# Shadcn Custom Date Range Picker

This skill provides an advanced Date Range Picker component for Shadcn UI, including custom date input formatting, calendar views, and utility functions.

## Assets Included
Located in `skills/shadcn-custom/date-range-picker/assets/`:
- `calendar.tsx` (Custom calendar wrapper)
- `date-input.tsx` (Input mask for dates)
- `date-range-picker.tsx` (Main DateRangePicker component)
- `input.tsx` (Extended input component)
- `utils.ts` (Date formatting and parsing utilities)

## Instructions
1. The user wants to add an advanced date range picker.
2. Read the components from the assets directory in this skill.
3. Place them in `src/components/date-range-picker/` (or the preferred components directory).
4. Ensure the necessary dependencies are installed in the user's project: `date-fns`, `lucide-react`, and standard Shadcn components (`popover`, `button`, etc. - if not present, install them via `npx shadcn@latest add ...`).

## Dependencies to Install
```bash
npm install date-fns lucide-react
npx shadcn@latest add popover button
```

5. When the user needs a date range picker, use the `DateRangePicker` component from `date-range-picker.tsx` with its `value` and `onChange` props matching `{ from: Date; to: Date } | undefined`.
