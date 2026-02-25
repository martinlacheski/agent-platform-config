---
name: shadcn-custom-forms
description: Custom Smart Form components like SmartDatePicker, SmartPhoneInput, and TimeSelectionChips. Trigger: When user asks for specialized input fields, phone inputs with masks, or quick time selection chips.
---

# Shadcn Custom Forms

This skill provides advanced, specialized form components built to integrate seamlessly with Shadcn UI forms.

## Assets Included
Located in `skills/shadcn-custom/forms/assets/`:
- `SmartPhoneInput.tsx` (Phone input with formatting/validation)
- `SmartDatePicker.tsx` (Advanced single date picker)
- `TimeSelectionChips.tsx` (Quick selection chips for time intervals)

## Instructions
1. When asked for specialized inputs, check the assets directory.
2. Read the requested component and place it in `src/components/custom/`.
3. Ensure required dependencies are present (e.g., `date-fns` for dates).
4. These components generally expect to be used within a standard Shadcn `<Form />` context but can be used standalone. Check the source for prop requirements.

## Dependencies to Install
```bash
npm install lucide-react date-fns
npx shadcn@latest add input button popover calendar
```
