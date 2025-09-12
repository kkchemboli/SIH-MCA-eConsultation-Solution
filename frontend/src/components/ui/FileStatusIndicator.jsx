import React from 'react';
import Icon from '../AppIcon';

const FileStatusIndicator = ({ 
  fileCount = 0, 
  processingCount = 0, 
  isProcessing = false,
  className = '' 
}) => {
  const getStatusIcon = () => {
    if (isProcessing) return 'Loader2';
    if (fileCount > 0) return 'CheckCircle2';
    return 'FileText';
  };

  const getStatusColor = () => {
    if (isProcessing) return 'text-warning';
    if (fileCount > 0) return 'text-success';
    return 'text-muted-foreground';
  };

  const getStatusText = () => {
    if (isProcessing) return `Processing ${processingCount} file${processingCount !== 1 ? 's' : ''}...`;
    if (fileCount > 0) return `${fileCount} document${fileCount !== 1 ? 's' : ''} ready`;
    return 'No documents';
  };

  return (
    <div className={`flex items-center space-x-2 text-sm ${className}`}>
      <Icon 
        name={getStatusIcon()} 
        size={16} 
        className={`${getStatusColor()} ${isProcessing ? 'animate-spin' : ''}`}
      />
      <span className={getStatusColor()}>
        {getStatusText()}
      </span>
    </div>
  );
};

export default FileStatusIndicator;