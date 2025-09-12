import React from 'react';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ 
  files, 
  onUpload, 
  onStartAnalysis, 
  onClearAll, 
  isUploading, 
  isProcessing,
  hasUploadedFiles 
}) => {
  const canUpload = files?.length > 0 && !isUploading && !isProcessing;
  const canAnalyze = hasUploadedFiles && !isUploading && !isProcessing;
  const canClear = files?.length > 0 && !isUploading && !isProcessing;

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        variant="default"
        size="lg"
        onClick={onUpload}
        disabled={!canUpload}
        loading={isUploading}
        iconName="Upload"
        iconPosition="left"
        className="min-w-[160px]"
      >
        {isUploading ? 'Uploading...' : 'Upload Documents'}
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={onStartAnalysis}
        disabled={!canAnalyze}
        loading={isProcessing}
        iconName="BarChart3"
        iconPosition="left"
        className="min-w-[160px]"
      >
        {isProcessing ? 'Processing...' : 'Start Analysis'}
      </Button>

      <Button
        variant="ghost"
        size="lg"
        onClick={onClearAll}
        disabled={!canClear}
        iconName="Trash2"
        iconPosition="left"
        className="min-w-[120px] text-muted-foreground hover:text-error"
      >
        Clear All
      </Button>
    </div>
  );
};

export default ActionButtons;