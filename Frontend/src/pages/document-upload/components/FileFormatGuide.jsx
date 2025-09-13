import React from 'react';
import Icon from '../../../components/AppIcon';

const FileFormatGuide = () => {
  const supportedFormats = [
    {
      type: 'PDF',
      icon: 'FileText',
      description: 'Portable Document Format',
      maxSize: '10MB',
      extensions: ['.pdf']
    },
    {
      type: 'Word',
      icon: 'FileType',
      description: 'Microsoft Word Documents',
      maxSize: '10MB',
      extensions: ['.doc', '.docx']
    }
  ];

  const guidelines = [
    "Maximum file size: 10MB per document",
    "Documents should contain readable text content",
    "Scanned documents may have limited analysis accuracy",
    "Processing time varies based on document size and complexity"
  ];

  return (
    <div className="bg-card border rounded-lg p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Supported File Formats</h3>
          <div className="space-y-3">
            {supportedFormats?.map((format) => (
              <div key={format?.type} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={format?.icon} size={16} className="text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-foreground">{format?.type}</h4>
                    <span className="text-xs text-muted-foreground">({format?.extensions?.join(', ')})</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{format?.description}</p>
                  <p className="text-xs text-success mt-1">Max size: {format?.maxSize}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Upload Guidelines</h3>
          <div className="space-y-2">
            {guidelines?.map((guideline, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Icon name="CheckCircle2" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{guideline}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-foreground">Processing Information</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Uploaded documents will be analyzed for sentiment, key themes, and content summarization. 
                All processing is performed securely and your documents are not stored permanently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileFormatGuide;