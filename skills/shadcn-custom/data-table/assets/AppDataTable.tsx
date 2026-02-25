import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  FileSpreadsheet,
  FileText,
  Filter,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import type { ReactNode, Ref } from "react";

interface AppDataTableProps {
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  onClearSearch?: () => void;
  searchInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  searchInputRef?: Ref<HTMLInputElement>;
  filtersOpen?: boolean;
  onToggleFilters?: () => void;
  hasActiveFilters?: boolean;
  filtersContent?: ReactNode;
  showResetSorting?: boolean;
  onResetSorting?: () => void;
  actions?: ReactNode;
  toolbarExtra?: ReactNode;
  tip?: ReactNode;
  exportActions?: {
    onExportExcel?: () => void;
    onExportPdf?: () => void;
    isExporting?: boolean;
  };
  children: ReactNode;
}

export function AppDataTable({
  searchValue,
  searchPlaceholder = "Buscar en todos los campos...",
  onSearchChange,
  onClearSearch,
  searchInputProps,
  searchInputRef,
  filtersOpen,
  onToggleFilters,
  hasActiveFilters,
  filtersContent,
  showResetSorting,
  onResetSorting,
  actions,
  toolbarExtra,
  tip,
  exportActions,
  children,
}: AppDataTableProps) {
  const showFilters = !!filtersContent;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue ?? ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className={cn("pl-8 bg-white pr-8", searchInputProps?.className)}
            {...searchInputProps}
            ref={searchInputRef}
          />
          {!!searchValue && onClearSearch && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 size-7 -translate-y-1/2"
              onClick={onClearSearch}
            >
              <X className="size-4" />
            </Button>
          )}
        </div>

        {showFilters && (
          <Button
            variant={filtersOpen ? "secondary" : "default"}
            className={
              filtersOpen ? "" : "bg-black text-white hover:bg-gray-800"
            }
            onClick={onToggleFilters}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtros
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                !
              </Badge>
            )}
          </Button>
        )}

        {showResetSorting && onResetSorting && (
          <Button variant="outline" onClick={onResetSorting}>
            <RotateCcw className="mr-2 size-4" />
            Limpiar ordenamiento
          </Button>
        )}

        <div className="ml-auto flex items-center gap-2">
          {toolbarExtra}
          {actions}
        </div>
      </div>

      {showFilters && (
        <Accordion
          type="single"
          collapsible
          value={filtersOpen ? "filters" : ""}
        >
          <AccordionItem value="filters" className="border-none">
            <AccordionContent>{filtersContent}</AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {(tip || exportActions?.onExportExcel || exportActions?.onExportPdf) && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-muted-foreground">{tip}</div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              {exportActions?.onExportExcel && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportActions.onExportExcel}
                      disabled={exportActions.isExporting}
                      className="text-green-700 border-green-200 hover:bg-green-50 gap-2"
                    >
                      <FileSpreadsheet className="h-4 w-4" />
                      <span className="hidden sm:inline">Excel</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Exportar a Excel</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {exportActions?.onExportPdf && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportActions.onExportPdf}
                      disabled={exportActions.isExporting}
                      className="text-red-700 border-red-200 hover:bg-red-50 gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      <span className="hidden sm:inline">PDF</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Exportar a PDF</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
