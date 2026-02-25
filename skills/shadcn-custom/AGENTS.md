# Shadcn Custom UI Components Router

This router manages the creation, configuration, and integration of Shadcn UI components and custom implementations across projects. 

## 1) Routing Principles

- When a request involves Shadcn UI, load this router first.
- Determine if the request is for base setup (styles, colors, config) or a specific component.
- Delegate to the corresponding sub-skill to get instructions, dependencies, and template files from its `assets/` directory.

## 2) Quick Intent -> Sub-Skill Matrix

| Intent | Load Sub-Skill |
|---|---|
| Initialize Shadcn, copy global CSS, Tailwind setup | `shadcn-custom-base-setup` |
| Add an advanced Date Range Picker | `shadcn-custom-date-range-picker` |
| Add a Combobox or Search Selector | `shadcn-custom-combobox` |
| Add an advanced DataTable with Pagination & Export | `shadcn-custom-data-table` |
| Add a Reusable Confirmation Dialog | `shadcn-custom-confirm-dialog` |
| Add SmartDatePicker, SmartPhoneInput, TimeSelectionChips | `shadcn-custom-forms` |
| Add ImageUploader, ImageViewer | `shadcn-custom-media` |
| Add Breadcrumbs, FullScreenLoading | `shadcn-custom-ui-blocks` |
| Fallback: Add Standard Shadcn Components manually | `shadcn-custom-core-ui` |

## 3) Dependencies by Sub-Skill
- **Base Setup**: `@tailwindcss/vite` (or postcss), `tailwindcss` (v4), `clsx`, `tailwind-merge`
- **Core UI**: `class-variance-authority`, `@radix-ui/react-*`, `lucide-react`
- **Date Range Picker**: `date-fns`, `lucide-react`, Shadcn (`popover`, `button`)
- **Combobox**: `cmdk`, `lucide-react`, Shadcn (`command`, `popover`, `badge`)
- **DataTable**: `@tanstack/react-table`, `exceljs`, `jspdf`, `jspdf-autotable`, Shadcn (`table`, `dropdown-menu`, `button`, `select`)
- **Confirm Dialog**: Shadcn (`alert-dialog`, `button`)
- **Forms**: `date-fns`, `lucide-react`, Shadcn (`input`, `button`, `popover`, `calendar`)
- **Media**: `lucide-react`, Shadcn (`button`, `dialog`)
- **UI Blocks**: `lucide-react`, Shadcn (`breadcrumb`, `spinner`)


## 4) Auto-Invoke Rules
- If a project needs a UI element that matches one of the custom components stored here, **always load the sub-skill first** instead of rewriting the component from scratch.
- If installing Shadcn in a new Next.js or Vite React project, use `shadcn-custom-base-setup` to ensure consistency in spacing, colors, and global CSS variables across all company projects.
