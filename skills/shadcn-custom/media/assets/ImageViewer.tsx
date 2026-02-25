import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Maximize, RotateCw, X, ZoomIn, ZoomOut } from "lucide-react";
import { useRef, useState } from "react";

interface ImageViewerProps {
  src: string;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageViewer({ src, alt, isOpen, onClose }: ImageViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 4));
  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.25, 0.5);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    e.preventDefault();
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Reset state when opening/closing
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    } else {
      handleReset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-max h-[90vh] p-0 overflow-hidden bg-black/95 border-none flex flex-col items-center justify-center">
        <DialogHeader className="absolute top-0 left-0 right-0 z-[110] p-4 bg-gradient-to-b from-black/80 to-transparent flex flex-row items-center justify-between pointer-events-none">
          <DialogTitle className="text-white text-sm font-medium truncate pointer-events-auto">
            {alt || "Visualización de Imagen"}
          </DialogTitle>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full text-white transition-colors pointer-events-auto"
            title="Cerrar"
          >
            <X className="h-6 w-6" />
          </button>
        </DialogHeader>

        <div
          ref={containerRef}
          className={`relative flex items-center justify-center w-full h-[85vh] overflow-hidden p-4 ${
            zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {src && (
            <img
              src={src}
              alt={alt || "Vista previa"}
              draggable={false}
              className="transition-transform duration-200 ease-out shadow-2xl select-none"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-2xl">
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-white/10 rounded-full text-white/80 transition-colors"
            title="Alejar"
          >
            <ZoomOut className="h-5 w-5" />
          </button>

          <div className="w-px h-4 bg-white/20 mx-1" />

          <span className="text-xs text-white w-14 text-center font-mono font-bold">
            {Math.round(zoom * 100)}%
          </span>

          <div className="w-px h-4 bg-white/20 mx-1" />

          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-white/10 rounded-full text-white/80 transition-colors"
            title="Acercar"
          >
            <ZoomIn className="h-5 w-5" />
          </button>

          <div className="w-px h-4 bg-white/20 mx-1" />

          <button
            onClick={handleRotate}
            className="p-2 hover:bg-white/10 rounded-full text-white/80 transition-colors"
            title="Rotar"
          >
            <RotateCw className="h-5 w-5" />
          </button>

          <div className="w-px h-4 bg-white/20 mx-1" />

          <button
            onClick={handleReset}
            className="p-2 hover:bg-white/10 rounded-full text-white/80 transition-colors"
            title="Reiniciar"
          >
            <Maximize className="h-5 w-5" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
