---
name: shadcn-custom
description: Unified skill package for custom Shadcn UI components, styles, and utilities. Trigger: When adding, configuring, or modifying Shadcn components, base styles, or complex custom components like DataTables or DatePickers.
license: Apache-2.0
metadata:
  author: AI
  version: "1.0"
  scope: [frontend, ui, react, shadcn]
  auto_invoke: "Installing Shadcn, configuring Tailwind for it, or adding custom components like Date Range Picker, Combobox, DataTable with PDF/Excel export, or Confirm Dialog."
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, Task
---

## When to Use
- Initializing a new React project with Shadcn UI.
- Applying global styles, colors, and layout foundations.
- Adding complex, pre-built custom components (Date Range Picker, Combobox, Advanced DataTable with Exports, Confirm Dialog).

## Auto-invoke Signals
- User asks to install or configure Shadcn UI base styles.
- User requests a complex date picker.
- User asks for a searchable select (combobox).
- User asks for a data table with pagination, filtering, or PDF/Excel export.
- User needs a global confirmation modal pattern.

## Skill Routing Matrix
| Request intent | Load subskill(s) |
| --- | --- |
| Set up Shadcn base, styles, colors, tailwind configs | `shadcn-custom-base-setup` |
| Add an advanced Date Range Picker component | `shadcn-custom-date-range-picker` |
| Add a Searchable Select (Combobox) component | `shadcn-custom-combobox` |
| Add an Advanced DataTable with PDF/Excel Export | `shadcn-custom-data-table` |
| Add a reusable Confirmation Dialog | `shadcn-custom-confirm-dialog` |
| Add SmartDatePicker, SmartPhoneInput, TimeSelectionChips | `shadcn-custom-forms` |
| Add ImageUploader, ImageViewer | `shadcn-custom-media` |
| Add Breadcrumbs, FullScreenLoading | `shadcn-custom-ui-blocks` |
| Fallback: Add Standard Shadcn Components manually | `shadcn-custom-core-ui` |

## Package Layout
- `shadcn-custom/SKILL.md`: Umbrella router skill for the Shadcn Custom suite.
- `shadcn-custom/base-setup/SKILL.md`: Core styles (`index.css`), `utils.ts`, and `components.json`.
- `shadcn-custom/core-ui/SKILL.md`: Offline / cached standard Shadcn components.
- `shadcn-custom/date-range-picker/SKILL.md`: Advanced Date Range Picker implementation.
- `shadcn-custom/combobox/SKILL.md`: Combobox and SearchSelector components.
- `shadcn-custom/data-table/SKILL.md`: AppDataTable, pagination, column headers, and PDF/Excel export utilities.
- `shadcn-custom/confirm-dialog/SKILL.md`: Reusable confirmation modal.
- `shadcn-custom/forms/SKILL.md`: Specialized Smart Input and Time components.
- `shadcn-custom/media/SKILL.md`: Image uploader and full-screen viewer.
- `shadcn-custom/ui-blocks/SKILL.md`: Structural elements like dynamic breadcrumbs and loaders.

## Quick Start
1. Identify the specific component or setup the user needs.
2. Load the corresponding subskill from the routing matrix.
3. Use the assets provided in the subskill's `assets/` directory to implement the requested feature.
