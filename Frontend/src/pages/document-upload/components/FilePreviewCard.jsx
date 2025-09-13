import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilePreviewCard = ({ file, onRemove, isProcessing }) => {
  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.')?.pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'FileText';
      case 'doc': case'docx':
        return 'FileType';
      case 'xls': case'xlsx':
        return 'Sheet';
      default:
        return 'File';
    }
  };

  const getFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getStatusColor = () => {
    switch (file?.status) {
      case 'uploaded':
        return 'text-success';
      case 'processing':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (file?.status) {
      case 'uploaded':
        return 'CheckCircle2';
      case 'processing':
        return 'Loader2';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Clock';
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-card border rounded-lg hover:shadow-sm transition-all duration-200">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
          <Icon name={getFileIcon(file?.name)} size={20} className="text-muted-foreground" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h4 className="text-sm font-medium text-foreground truncate">{file?.name}</h4>
          <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
            <Icon 
              name={getStatusIcon()} 
              size={14} 
              className={file?.status === 'processing' ? 'animate-spin' : ''}
            />
            <span className="text-xs capitalize">{file?.status || 'pending'}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-1">
          <p className="text-xs text-muted-foreground">{getFileSize(file?.size)}</p>
          {file?.uploadProgress !== undefined && file?.uploadProgress < 100 && (
            <div className="flex items-center space-x-2">
              <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${file?.uploadProgress}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{file?.uploadProgress}%</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(file?.id)}
          disabled={isProcessing}
          className="h-8 w-8 text-muted-foreground hover:text-error"
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default FilePreviewCard;