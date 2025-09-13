import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import { Checkbox } from './Checkbox';

const ChatContextPanel = ({ 
  documents = [], 
  selectedDocuments = [], 
  onDocumentToggle,
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

  if (isCollapsed) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          iconName="PanelLeftOpen"
          iconPosition="left"
        >
          Documents ({selectedDocuments?.length})
        </Button>
      </div>
    );
  }

  return (
    <div className={`w-80 border-r bg-card ${className}`}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-medium">Document Context</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-8 w-8"
          >
            <Icon name="PanelLeftClose" size={16} />
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
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <Icon name="FileX" size={24} className="mb-2" />
              <p className="text-sm">
                {documents?.length === 0 ? 'No documents uploaded' : 'No documents match your search'}
              </p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {filteredDocuments?.map((doc) => (
                <div
                  key={doc?.id}
                  className="flex items-start space-x-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
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
                    {doc?.size && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {(doc?.size / 1024)?.toFixed(1)} KB
                      </p>
                    )}
                    {doc?.status && (
                      <div className="flex items-center space-x-1 mt-1">
                        <div className={`w-2 h-2 rounded-full ${
                          doc?.status === 'processed' ? 'bg-success' :
                          doc?.status === 'processing'? 'bg-warning' : 'bg-muted-foreground'
                        }`} />
                        <span className="text-xs text-muted-foreground capitalize">
                          {doc?.status}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="text-xs text-muted-foreground">
            {selectedDocuments?.length} of {documents?.length} documents selected
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContextPanel;