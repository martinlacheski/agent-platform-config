# Componente DateRangePicker - Paquete de Exportación

Esta carpeta contiene todo lo necesario para integrar el `DateRangePicker` en tu proyecto.

## Contenido

1.  `date-range-picker.tsx`: El componente principal.
2.  `calendar.tsx`: Componente de calendario personalizado (basado en `react-day-picker`).
3.  `date-input.tsx`: Componente de entrada de fecha manual.
4.  `input.tsx`: Componente base de input.
5.  `utils.ts`: Utilidades para manejar clases CSS (`cn`).

## Requisitos Previos

Tu proyecto debe tener instaladas las siguientes librerías:

```bash
npm install react-day-picker date-fns lucide-react clsx tailwind-merge
```

Además, este componente asume que estás usando **Shadcn UI**. Se espera que tengas configurados los siguientes componentes en tu proyecto (usualmente en `@/components/ui/`):

- `Button`
- `Popover`
- `Select`
- `Switch`
- `Label`

## Instrucciones

1.  Copia toda esta carpeta a tu proyecto, por ejemplo en `src/components/custom/date-range-picker/` (o donde prefieras).
2.  Si tus componentes base de Shadcn (Button, etc.) **NO** están en `@/components/ui/`, abre `date-range-picker.tsx` y `calendar.tsx` y ajusta las rutas de importación en la parte superior.

## Uso

```tsx
import { DateRangePicker } from "./path/to/date-range-picker";
import type { DateRange } from "react-day-picker";

export default function MyPage() {
  const handleUpdate = ({ range }: { range: DateRange }) => {
    console.log("Nuevo rango:", range);
  };

  return (
    <DateRangePicker
      onUpdate={handleUpdate}
      initialDateFrom={new Date()}
      showCompare={true}
    />
  );
}
```
