import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const DocumentKnowledgePanel = ({ 
  documents = [], 
  selectedDocuments = [], 
  onDocumentToggle,
  onUploadMore,
  isCollapsed = false,
  onToggleCollapse,
  className = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocuments = documents?.filter(doc =>
    doc?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedDocuments?.length === documents?.length) {
      // Deselect all
      documents?.forEach(doc => onDocumentToggle(doc?.id, false));
    } else {
      // Select all
      documents?.forEach(doc => onDocumentToggle(doc?.id, true));
    }
  };

  const isAllSelected = selectedDocuments?.length === documents?.length && documents?.length > 0;
  const isPartiallySelected = selectedDocuments?.length > 0 && selectedDocuments?.length < documents?.length;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processed': return 'CheckCircle2';
      case 'processing': return 'Loader2';
      case 'error': return 'AlertCircle';
      default: return 'Clock';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed': return 'text-success';
      case 'processing': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  if (isCollapsed) {
    return (
      <div className={`flex items-center justify-between p-4 border-b bg-card ${className}`}>
        <div className="flex items-center space-x-2">
          <Icon name="Database" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium">Knowledge Base ({selectedDocuments?.length} active)</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="h-8 w-8"
          title="Expand knowledge panel"
        >
          <Icon name="PanelRightOpen" size={16} />
        </Button>
      </div>
    );
  }

  return (
    <div className={`w-80 border-l bg-card flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center space-x-2">
          <Icon name="Database" size={16} className="text-muted-foreground" />
          <h3 className="font-medium">Knowledge Base</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="h-8 w-8"
          title="Collapse knowledge panel"
        >
          <Icon name="PanelRightClose" size={16} />
        </Button>
      </div>
      {/* Upload Button */}
      <div className="p-4 border-b">
        <Button
          variant="outline"
          onClick={onUploadMore}
          iconName="Plus"
          iconPosition="left"
          className="w-full"
        >
          Add Documents
        </Button>
      </div>
      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      {/* Select All */}
      {documents?.length > 0 && (
        <div className="p-4 border-b">
          <Checkbox
            label="Select all documents"
            checked={isAllSelected}
            indeterminate={isPartiallySelected}
            onChange={handleSelectAll}
            className="text-sm"
          />
        </div>
      )}
      {/* Document List */}
      <div className="flex-1 overflow-y-auto">
        {filteredDocuments?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground p-4">
            <Icon name={documents?.length === 0 ? "FileX" : "Search"} size={24} className="mb-2" />
            <p className="text-sm text-center">
              {documents?.length === 0 
                ? 'No documents in knowledge base. Upload documents to get started.' 
                : 'No documents match your search'
              }
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {filteredDocuments?.map((doc) => (
              <div
                key={doc?.id}
                className="flex items-start space-x-3 p-3 rounded-md hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  checked={selectedDocuments?.includes(doc?.id)}
                  onChange={(e) => onDocumentToggle(doc?.id, e?.target?.checked)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <Icon name="FileText" size={14} className="text-muted-foreground flex-shrink-0" />
                    <span className="text-sm font-medium truncate">{doc?.name}</span>
                  </div>
                  
                  {/* File Info */}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      {doc?.size ? `${(doc?.size / 1024)?.toFixed(1)} KB` : 'Unknown size'}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Icon 
                        name={getStatusIcon(doc?.status)} 
                        size={12} 
                        className={`${getStatusColor(doc?.status)} ${doc?.status === 'processing' ? 'animate-spin' : ''}`}
                      />
                      <span className={`text-xs capitalize ${getStatusColor(doc?.status)}`}>
                        {doc?.status || 'pending'}
                      </span>
                    </div>
                  </div>

                  {/* Processing Progress */}
                  {doc?.status === 'processing' && (
                    <div className="mt-2">
                      <div className="w-full bg-muted rounded-full h-1">
                        <div 
                          className="bg-warning h-1 rounded-full transition-all duration-300"
                          style={{ width: `${doc?.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer Stats */}
      <div className="border-t p-4 bg-muted/30">
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Total documents:</span>
            <span>{documents?.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Active in chat:</span>
            <span>{selectedDocuments?.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Processed:</span>
            <span>{documents?.filter(d => d?.status === 'processed')?.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentKnowledgePanel;