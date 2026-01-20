
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X, AlertCircle } from 'lucide-react';

interface UploadStepProps {
  onBack: () => void;
  onUploadComplete: (newMedia: string[]) => void;
}

interface FilePreview extends File {
  preview: string;
  progress?: number;
  error?: string;
}

export function UploadStep({ onBack, onUploadComplete }: UploadStepProps) {
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [flagAsIssue, setFlagAsIssue] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(prev => [...prev, ...newFiles].slice(0, 12)); // Limit to 12 files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (file: FilePreview) => {
    setFiles(files.filter(f => f !== file));
    URL.revokeObjectURL(file.preview);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setUploadError(null);

    // Simulate file upload
    const uploadedFileUrls = [];
    for (const file of files) {
        // Simulate progress
        for (let progress = 10; progress <= 100; progress += 10) {
            await new Promise(resolve => setTimeout(resolve, 50));
            setFiles(prev => prev.map(f => f === file ? { ...f, progress } : f));
        }
        uploadedFileUrls.push(file.preview);
    }

    setIsUploading(false);
    onUploadComplete(uploadedFileUrls);
  };

  const formatBytes = (bytes: number, decimals = 2) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  return (
    <div className="flex-1 flex flex-col -mx-6 px-6">
        <div {...getRootProps()} className={`mt-6 border-2 border-dashed rounded-lg p-12 text-center cursor-pointer ${isDragActive ? 'border-primary' : 'border-input'}`}>
            <input {...getInputProps()} />
            <p className="text-muted-foreground">Drag and drop photos here</p>
            <p className="text-sm text-muted-foreground">or</p>
            <Button type="button" variant="outline" className="mt-2">Browse files</Button>
            <p className="text-xs text-muted-foreground mt-4">PNG, JPG up to 10MB each. Up to 12 photos at a time.</p>
        </div>

        {uploadError && (
            <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Upload failed</AlertTitle>
                <AlertDescription>{uploadError}</AlertDescription>
            </Alert>
        )}

        {files.length > 0 && (
            <div className="flex-1 mt-6 overflow-y-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {files.map((file, i) => (
                        <div key={i} className="relative border rounded-lg p-2 space-y-2">
                            <div className="flex items-center space-x-2">
                                <img src={file.preview} alt={file.name} className="w-12 h-12 object-cover rounded" />
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-medium truncate">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                                </div>
                            </div>
                            {isUploading && file.progress && <Progress value={file.progress} className="h-2" />}
                            {file.error && <p className="text-xs text-red-500">{file.error}</p>}
                            {!isUploading && <button onClick={() => removeFile(file)} className="absolute top-1 right-1 bg-background rounded-full p-0.5"><X className="h-3 w-3" /></button>}
                        </div>
                    ))}
                </div>
            </div>
        )}

        <div className="mt-auto space-y-4 pt-4">
            <div className="flex items-center space-x-2">
                <Checkbox id="flag-issue" checked={flagAsIssue} onCheckedChange={(c) => setFlagAsIssue(!!c)} />
                <Label htmlFor="flag-issue" className="font-normal">Flag as issue</Label>
            </div>
            <p className="text-sm text-muted-foreground">Adds a warning indicator to the road/project for review.</p>
        
            <div className="flex justify-end space-x-4">
                <Button variant="secondary" onClick={onBack} disabled={isUploading}>Back</Button>
                <Button onClick={handleUpload} disabled={isUploading || files.length === 0}>
                    {isUploading ? 'Uploading...' : 'Upload & Attach'}
                </Button>
            </div>
        </div>
    </div>
  );
}
