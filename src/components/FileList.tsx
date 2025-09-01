import { FileItem, FileData } from "./FileItem";

interface FileListProps {
  files: FileData[];
  onDeleteFile: (id: string) => void;
  onCancelUpload?: (id: string) => void;
}

export const FileList = ({ files, onDeleteFile, onCancelUpload }: FileListProps) => {
  if (files.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Uploads</h3>
      <div className="space-y-3">
        {files.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            onDelete={onDeleteFile}
            onCancel={onCancelUpload}
          />
        ))}
      </div>
    </div>
  );
};