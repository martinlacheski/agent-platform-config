---
name: shadcn-custom-media
description: Reusable Media Upload and Viewing components. Trigger: When user asks for image uploaders, file upload drag-and-drop, or full-screen image viewers.
---

# Shadcn Custom Media

This skill provides generic, reusable components for handling media files, specifically image uploading and viewing.

## Assets Included
Located in `skills/shadcn-custom/media/assets/`:
- `ImageUploader.tsx` (Drag-and-drop image uploader)
- `ImageViewer.tsx` (Full-screen or modal image previewer)

## Instructions
1. When asked for image uploading or viewing features, read the components from the assets directory in this skill.
2. Place them in `src/components/custom/`.
3. Check the components' imports to verify dependencies (e.g., Lucide icons, Shadcn UI basic components like `Button` or `Dialog`).

## Dependencies to Install
```bash
npm install lucide-react
npx shadcn@latest add button dialog
```
