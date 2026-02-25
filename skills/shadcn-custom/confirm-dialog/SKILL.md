---
name: shadcn-custom-confirm-dialog
description: Reusable Confirmation Modal Dialog component. Trigger: When user asks for a confirmation modal, delete dialog, alert dialog, or confirmation screen.
---

# Shadcn Custom Confirm Dialog

This skill provides a reusable Confirmation Dialog component built on top of Shadcn UI `AlertDialog`.

## Assets Included
Located in `skills/shadcn-custom/confirm-dialog/assets/`:
- `ConfirmDialog.tsx` (Reusable confirmation modal)

## Instructions
1. Read the `ConfirmDialog.tsx` component from the assets directory in this skill.
2. Place it in `src/components/custom/ConfirmDialog.tsx`.
3. Ensure the project has `@radix-ui/react-alert-dialog` and Shadcn's `alert-dialog` component installed.
4. When the user requests a confirmation modal (e.g., "Are you sure you want to delete this?"), use this component.

## Dependencies to Install
```bash
npx shadcn@latest add alert-dialog button
npm install lucide-react
```

## Usage Example
```tsx
<ConfirmDialog
  isOpen={isDialogOpen}
  onClose={() => setIsDialogOpen(false)}
  onConfirm={handleDelete}
  title="Eliminar Registro"
  description="¿Está seguro de que desea eliminar este registro? Esta acción no se puede deshacer."
  confirmText="Eliminar"
  cancelText="Cancelar"
  type="danger" // or 'warning', 'info'
/>
```
