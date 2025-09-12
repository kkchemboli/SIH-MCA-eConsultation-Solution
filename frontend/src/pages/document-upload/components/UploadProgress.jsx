import React from 'react';
import Icon from '../../../components/AppIcon';

const UploadProgress = ({ 
  totalFiles, 
  uploadedFiles, 
  processingFiles, 
  currentFile, 
  overallProgress,
  isVisible 
}) => {
  if (!isVisible) return null;

  const getProgressColor = () => {
    if (overallProgress === 100) return 'bg-success';
    if (overallProgress > 0) return 'bg-primary';
    return 'bg-muted';
  };

  const getStatusText = () => {
    if (overallProgress === 100) {
      return 'All documents processed successfully';
    }
    if (processingFiles > 0) {
      return `Processing ${currentFile}...`;
    }
    if (uploadedFiles > 0) {
      return `Uploaded ${uploadedFiles} of ${totalFiles} files`;
    }
    return 'Preparing upload...';
  };

  return (
    <div className="bg-card border rounded-lg p-6 animate-in fade-in duration-300">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Upload Progress</h3>
          <div className="flex items-center space-x-2">
            {overallProgress === 100 ? (
              <Icon name="CheckCircle2" size={20} className="text-success" />
            ) : (
              <Icon name="Loader2" size={20} className="text-primary animate-spin" />
            )}
            <span className="text-sm font-medium text-foreground">{overallProgress}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${getProgressColor()}`}
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{getStatusText()}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{totalFiles}</div>
            <div className="text-xs text-muted-foreground">Total Files</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-success">{uploadedFiles}</div>
            <div className="text-xs text-muted-foreground">Uploaded</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-warning">{processingFiles}</div>
            <div className="text-xs text-muted-foreground">Processing</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProgress;