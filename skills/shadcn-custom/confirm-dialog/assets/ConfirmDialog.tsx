import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { useConfirmStore } from "@/store/confirm.store";
import { toast } from "sonner";

export const ConfirmDialog = () => {
  const {
    isOpen,
    message,
    title,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel,
    closeConfirm,
  } = useConfirmStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      closeConfirm();
    } catch {
      toast.error("Error al confirmar la acción");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    if (onCancel) await onCancel();
    closeConfirm();
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => !isLoading && !open && closeConfirm()}
    >
      <AlertDialogContent className="w-[90%] sm:w-[350px] gap-2 p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-6 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Procesando...</p>
          </div>
        ) : (
          <>
            <AlertDialogHeader className="gap-1">
              <AlertDialogTitle className="text-base">
                {title || "Confirmación"}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-sm py-2 text-slate-800 dark:text-slate-200">
                {message}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="justify-center gap-2">
              <AlertDialogCancel
                className="w-20 h-8 text-sm"
                disabled={isLoading}
                onClick={handleCancel}
              >
                {cancelLabel || "No"}
              </AlertDialogCancel>
              <AlertDialogAction
                className="w-20 h-8 text-sm bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  handleConfirm();
                }}
                disabled={isLoading}
                autoFocus
              >
                {confirmLabel || "Si"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
