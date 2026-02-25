---
name: shadcn-custom-data-table
description: Advanced DataTable with pagination, filtering, column headers, and PDF/Excel export capabilities. Trigger: When user asks for a data table, pagination, exporting to PDF/Excel, sortable columns, or table filters.
---

# Shadcn Custom DataTable

This skill provides a full-featured DataTable component for Shadcn UI using `@tanstack/react-table`, including pagination, column headers, and PDF/Excel export functions.

## Assets Included
Located in `skills/shadcn-custom/data-table/assets/`:
- `AppDataTable.tsx` (Main DataTable component)
- `DataTablePagination.tsx` (Pagination controls)
- `DataTableColumnHeader.tsx` (Sortable column headers)
- `export.utils.ts` (Functions to export data to PDF and Excel)

## Instructions
1. The user wants to add an advanced data table or export functionality.
2. Read the components from the assets directory in this skill.
3. Place them in `src/components/custom/AppDataTable.tsx`, `DataTablePagination.tsx`, `DataTableColumnHeader.tsx`.
4. Place `export.utils.ts` in `src/lib/export.utils.ts`.
5. Ensure `@tanstack/react-table` and export dependencies (`exceljs`, `jspdf`, `jspdf-autotable`) are installed.
6. Make sure Shadcn UI `table`, `dropdown-menu`, `button`, `select` are installed.

## Dependencies to Install
```bash
npm install @tanstack/react-table exceljs jspdf jspdf-autotable date-fns
npm install lucide-react
npx shadcn@latest add table dropdown-menu button select
```

## Usage Example
- `exportToPdf` and `exportToExcel` functions from `export.utils.ts` accept `{ title, filename, generatedBy, columns, data }`.
- Use `AppDataTable` passing `columns`, `data`, `searchKey` (for global search), `pagination` object, and `exportActions` with `onExportExcel` and `onExportPdf` callbacks.
