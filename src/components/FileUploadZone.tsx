import { useCallback, useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadZoneProps {
  onFilesAdded: (files: File[]) => void;
  className?: string;
}

export const FileUploadZone = ({ onFilesAdded, className }: FileUploadZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    onFilesAdded(files);
  }, [onFilesAdded]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onFilesAdded(files);
  }, [onFilesAdded]);

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg p-12 text-center transition-colors",
        isDragOver 
          ? "border-upload-active bg-upload-active" 
          : "border-upload-border bg-upload-hover hover:bg-upload-active",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept=".pdf,.zip,.doc,.docx,.txt"
      />
      
      <div className="space-y-4">
        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-muted">
          <Upload className="w-6 h-6 text-muted-foreground" />
        </div>
        
        <div className="space-y-2">
          <p className="text-foreground font-medium">
            Drop your files here or browse
          </p>
          <p className="text-sm text-muted-foreground">
            Max file size up to 1 GB
          </p>
        </div>
      </div>
    </div>
  );
};