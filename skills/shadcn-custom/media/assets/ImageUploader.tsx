import { ImagePlus, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

interface ImageUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
}

export function ImageUploader({
  files,
  onFilesChange,
  maxFiles = 5,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles: File[] = [];

      newFiles.forEach((file) => {
        if (!file.type.startsWith("image/")) {
          toast.error(`El archivo ${file.name} no es una imagen`);
          return;
        }
        validFiles.push(file);
      });

      if (files.length + validFiles.length > maxFiles) {
        toast.error(`Solo se permiten un máximo de ${maxFiles} imágenes`);
        return;
      }

      onFilesChange([...files, ...validFiles]);
    }
    // Reset inputs
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onFilesChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="relative w-24 h-24 border rounded-md overflow-hidden group bg-gray-50 flex items-center justify-center"
          >
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-full h-full object-cover"
              onLoad={() => {
                // Revoke URL to free memory? Not strictly necessary for small amounts but good practice.
                // URL.revokeObjectURL(...) - wait, this might break rendering if we re-render?
                // Better let React handle it or just leave it for now.
              }}
            />
            <button
              onClick={() => removeFile(index)}
              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3 text-red-500" />
            </button>
          </div>
        ))}

        {files.length < maxFiles && (
          <div
            className="w-24 h-24 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors text-gray-400 hover:text-gray-600"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImagePlus className="h-6 w-6 mb-1" />
            <span className="text-xs">Agregar</span>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
    </div>
  );
}
