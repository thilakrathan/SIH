import { FileText, Archive, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";

export interface FileData {
  id: string;
  name: string;
  size: number;
  type: string;
  progress?: number;
  isUploading?: boolean;
}

interface FileItemProps {
  file: FileData;
  onDelete: (id: string) => void;
  onCancel?: (id: string) => void;
}

const getFileIcon = (type: string) => {
  if (type.includes('pdf')) return FileText;
  if (type.includes('zip') || type.includes('rar')) return Archive;
  return FileText;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const FileItem = ({ file, onDelete, onCancel }: FileItemProps) => {
  const Icon = getFileIcon(file.type);
  const isUploading = file.isUploading && file.progress !== undefined;

  return (
    <div className="flex items-center gap-4 p-4 bg-file-item rounded-lg border border-border">
      {/* File type icon */}
      <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>

      {/* File info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground truncate">{file.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          {isUploading ? (
            <div className="flex items-center gap-2 w-full">
              <span className="text-sm text-muted-foreground">
                {formatFileSize(file.size * (file.progress! / 100))} of {formatFileSize(file.size)}
              </span>
              <ProgressBar progress={file.progress!} className="flex-1 max-w-48" />
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">
              {formatFileSize(file.size)}
            </span>
          )}
        </div>
      </div>

      {/* Action button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => isUploading ? onCancel?.(file.id) : onDelete(file.id)}
        className="flex-shrink-0 text-muted-foreground hover:text-destructive"
      >
        {isUploading ? (
          <X className="w-4 h-4" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};