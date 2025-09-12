import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ExportMenu = ({ 
  onExportPDF, 
  onExportMarkdown, 
  isExporting = false,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const exportOptions = [
    {
      id: 'pdf',
      label: 'Export as PDF',
      icon: 'FileText',
      description: 'Download analysis report as PDF',
      action: onExportPDF
    },
    {
      id: 'markdown',
      label: 'Export as Markdown',
      icon: 'FileDown',
      description: 'Download analysis report as Markdown',
      action: onExportMarkdown
    }
  ];

  const handleExport = (option) => {
    if (option?.action) {
      option?.action();
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExporting}
        iconName="Download"
        iconPosition="left"
        className="min-w-[120px]"
      >
        {isExporting ? 'Exporting...' : 'Export'}
      </Button>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-full z-20 mt-2 w-64 rounded-md border bg-popover p-1 shadow-elevation-2">
            {exportOptions?.map((option) => (
              <button
                key={option?.id}
                onClick={() => handleExport(option)}
                disabled={isExporting}
                className="flex w-full items-start space-x-3 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
              >
                <Icon name={option?.icon} size={16} className="mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-medium">{option?.label}</div>
                  <div className="text-xs text-muted-foreground">{option?.description}</div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExportMenu;