import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileUploadZone } from "@/components/FileUploadZone";
import { FileList } from "@/components/FileList";
import { FileData } from "@/components/FileItem";
import { ProfileButton } from "@/components/ProfileButton";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [files, setFiles] = useState<FileData[]>([]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, progress: 100, isUploading: false }
            : f
        ));
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        ));
      }
    }, 200);

    return interval;
  };

  const handleFilesAdded = useCallback((newFiles: File[]) => {
    const fileData: FileData[] = newFiles.map(file => ({
      id: generateId(),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      isUploading: true
    }));

    setFiles(prev => [...prev, ...fileData]);

    // Simulate upload for each file
    fileData.forEach(file => {
      simulateUpload(file.id);
    });

    toast({
      title: "Files added",
      description: `${newFiles.length} file(s) are being uploaded.`,
    });
  }, []);

  const handleDeleteFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    toast({
      title: "File removed",
      description: "The file has been removed from your uploads.",
    });
  }, []);

  const handleCancelUpload = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    toast({
      title: "Upload cancelled",
      description: "The file upload has been cancelled.",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header with Profile */}
        <div className="relative mb-8">
          {/* Profile Button - positioned absolutely to the left */}
          <div className="absolute left-0 top-0">
            <ProfileButton 
              userName="John Doe"
              onClick={() => toast({
                title: "Profile",
                description: "Profile menu clicked",
              })}
            />
          </div>
          
          {/* Centered Header Content */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Upload Files
            </h1>
            <p className="text-muted-foreground">
              Upload your user-downloadable files.
            </p>
          </div>
        </div>

        {/* Upload Zone */}
        <div className="mb-8">
          <FileUploadZone onFilesAdded={handleFilesAdded} />
        </div>

        {/* File List */}
        <div className="mb-12">
          <FileList
            files={files}
            onDeleteFile={handleDeleteFile}
            onCancelUpload={handleCancelUpload}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" size="lg">
            Back
          </Button>
          <Button size="lg" className="px-8" asChild>
            <Link to="/login">Next</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;