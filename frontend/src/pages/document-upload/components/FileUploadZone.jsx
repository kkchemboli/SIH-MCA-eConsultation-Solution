import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ onFilesSelected, isUploading, acceptedFormats }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    if (files?.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    if (files?.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div
      className={`
        relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200
        ${isDragOver 
          ? 'border-primary bg-primary/5 scale-[1.02]' 
          : 'border-border bg-card hover:border-primary/50 hover:bg-muted/30'
        }
        ${isUploading ? 'pointer-events-none opacity-60' : 'cursor-pointer'}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleBrowseClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedFormats?.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />
      <div className="flex flex-col items-center space-y-4">
        <div className={`
          p-4 rounded-full transition-all duration-200
          ${isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
        `}>
          <Icon 
            name={isUploading ? "Loader2" : "Upload"} 
            size={32} 
            className={isUploading ? "animate-spin" : ""}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {isUploading ? 'Uploading Documents...' : 'Upload Your Documents'}
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Drag and drop your files here, or click to browse. 
            Supports PDF, Word, and Excel formats up to 10MB each.
          </p>
        </div>

        {!isUploading && (
          <Button variant="outline" className="mt-4">
            <Icon name="FolderOpen" size={16} className="mr-2" />
            Browse Files
          </Button>
        )}
      </div>
      {isDragOver && (
        <div className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center">
          <div className="text-primary font-medium">Drop files here</div>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;