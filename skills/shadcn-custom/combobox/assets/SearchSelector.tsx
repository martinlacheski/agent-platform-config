import { useAuthStore } from "@/auth/store/auth.store";
import { AppDataTable } from "@/components/custom/AppDataTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { exportToExcel, exportToPdf } from "@/lib/export.utils";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { DataTablePagination } from "../custom/DataTablePagination";

interface SearchSelectorProps<T> {
  title: string;
  placeholder?: string;
  value?: T | null;
  onSelect: (item: T) => void;
  onClear?: () => void;
  renderValue: (item: T) => string;
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  totalItems?: number;
  onSearchChange?: (value: string) => void;
  onPaginationChange?: (page: number, size: number) => void;
  page?: number;
  size?: number;
  disabled?: boolean;
  focusRef?: React.Ref<HTMLInputElement>;
  manualPagination?: boolean;
  showPageSizeOptions?: boolean;
}

export function SearchSelector<T>({
  title,
  placeholder = "Seleccionar...",
  value,
  onSelect,
  onClear,
  renderValue,
  columns,
  data,
  isLoading,
  totalItems = 0,
  onSearchChange,
  onPaginationChange,
  page = 1,
  size = 10,
  disabled = false,
  focusRef,
  manualPagination = true,
  showPageSizeOptions = true,
}: SearchSelectorProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSearch, setInternalSearch] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isExporting, setIsExporting] = useState(false);
  const { user: currentUser } = useAuthStore();

  const [internalPagination, setInternalPagination] = useState({
    pageIndex: page - 1,
    pageSize: size,
  });

  const paginationState = useMemo(
    () =>
      manualPagination
        ? {
            pageIndex: page - 1,
            pageSize: size,
          }
        : internalPagination,
    [manualPagination, page, size, internalPagination],
  );

  const table = useReactTable({
    data,
    columns,
    pageCount: manualPagination ? Math.ceil(totalItems / size) : undefined,
    state: {
      pagination: paginationState,
      rowSelection,
      sorting,
    },
    onPaginationChange: (updater) => {
      let nextState;
      if (typeof updater === "function") {
        nextState = updater(paginationState);
      } else {
        nextState = updater;
      }

      if (manualPagination) {
        onPaginationChange?.(nextState.pageIndex + 1, nextState.pageSize);
      } else {
        setInternalPagination(nextState);
      }
    },
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination,
    enableMultiSort: true,
  });

  const handleExport = async (format: "pdf" | "excel") => {
    try {
      setIsExporting(true);
      const toastId = toast.loading("Generando reporte...");

      const rows = table.getRowModel().rows;
      if (!rows.length) {
        toast.error("No hay datos para exportar", { id: toastId });
        return;
      }

      const leafColumns = table.getAllLeafColumns();
      const exportColumns = leafColumns.map((col) => {
        const header = col.columnDef.header;
        if (typeof header === "string") return header;
        const meta = col.columnDef.meta as { label?: unknown } | undefined;
        if (typeof meta?.label === "string") {
          return meta.label;
        }
        return col.id;
      });

      const exportOptions = {
        title: `Reporte de ${title}`,
        filename: `reporte_${title.toLowerCase().replace(/\s+/g, "_")}`,
        generatedBy:
          currentUser?.fullName || currentUser?.username || "Usuario",
        columns: exportColumns,
        data: rows.map((row) =>
          leafColumns.map((col) => {
            const value = row.getValue(col.id);
            return value === null || value === undefined ? "" : String(value);
          }),
        ),
      };

      if (format === "pdf") {
        exportToPdf(exportOptions);
      } else {
        await exportToExcel(exportOptions);
      }

      toast.success("Reporte generado correctamente", { id: toastId });
    } catch {
      toast.error("Error al generar el reporte");
    } finally {
      setIsExporting(false);
    }
  };

  const handleOpen = () => {
    if (!disabled) setIsOpen(true);
  };

  const handleSelect = (item: T) => {
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            ref={focusRef}
            readOnly
            placeholder={placeholder}
            value={value ? renderValue(value) : ""}
            onClick={handleOpen}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleOpen();
              }
            }}
            className={`cursor-pointer pr-10 ${
              disabled ? "bg-gray-50 opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={disabled}
          />
          {value && onClear && !disabled && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-8 top-1/2 size-7 -translate-y-1/2"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
            >
              <X className="size-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 size-7 -translate-y-1/2"
            onClick={handleOpen}
            disabled={disabled}
          >
            <Search className="size-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-6">
          <DialogHeader>
            <DialogTitle>Seleccionar {title}</DialogTitle>
            <DialogDescription className="sr-only">
              Seleccione un elemento de la lista desplegable de {title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 flex-1 flex flex-col min-h-0">
            <AppDataTable
              searchValue={internalSearch}
              searchPlaceholder="Buscar..."
              onSearchChange={(value) => {
                setInternalSearch(value);
                onSearchChange?.(value);
              }}
              onClearSearch={() => {
                setInternalSearch("");
                onSearchChange?.("");
              }}
              searchInputProps={{
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    const rows = table.getRowModel().rows;
                    if (rows.length === 1) {
                      handleSelect(rows[0].original);
                    }
                  }
                },
                autoFocus: true,
              }}
              searchInputRef={focusRef}
              showResetSorting={sorting.length > 0}
              onResetSorting={() => setSorting([])}
              tip={
                <p>
                  <span className="font-semibold">Tip:</span> Para ordenar por
                  múltiples columnas, mantener presionada la tecla{" "}
                  <strong>Shift</strong>
                  al hacer clic en los encabezados.
                </p>
              }
              exportActions={{
                onExportExcel: () => handleExport("excel"),
                onExportPdf: () => handleExport("pdf"),
                isExporting,
              }}
            >
              <div className="flex-1 overflow-auto rounded-md border">
                <Table>
                  <TableHeader className="bg-gray-50 sticky top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            className="text-gray-700 font-semibold text-center"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          Cargando...
                        </TableCell>
                      </TableRow>
                    ) : table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          className={`hover:bg-gray-50/50 cursor-pointer select-none ${
                            row.getIsSelected()
                              ? "bg-primary/5 ring-1 ring-primary/30"
                              : ""
                          }`}
                          onClick={() => row.toggleSelected(true)}
                          onDoubleClick={() => handleSelect(row.original)}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="text-center">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No hay resultados.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-2">
                <DataTablePagination
                  table={table}
                  totalItems={totalItems}
                  entityName={title}
                  showPageSizeOptions={showPageSizeOptions}
                />
              </div>
            </AppDataTable>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button
                disabled={!table.getSelectedRowModel().rows.length}
                onClick={() => {
                  const selectedRows = table.getSelectedRowModel().rows;
                  if (selectedRows.length > 0) {
                    handleSelect(selectedRows[0].original);
                  }
                }}
              >
                Seleccionar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
