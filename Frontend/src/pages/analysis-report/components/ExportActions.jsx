import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const ExportActions = ({ onExportPDF, className = '' }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState('');

  const handleExport = async (type, exportFunction) => {
    setIsExporting(true);
    setExportType(type);
    
    try {
      if (exportFunction) {
        await exportFunction();
      } else {
        // Mock export functionality
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Create mock download
        const content = type === 'pdf' ? 'Mock PDF Content' : `# Analysis Report\n\nGenerated on: ${new Date()?.toLocaleDateString()}\n\n## Summary\nThis is a mock export of the analysis report.`;
        const blob = new Blob([content], { type: type === 'pdf' ? 'application/pdf' : 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analysis-report.${type === 'pdf' ? 'pdf' : 'md'}`;
        document.body?.appendChild(a);
        a?.click();
        document.body?.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(`Export ${type} failed:`, error);
    } finally {
      setIsExporting(false);
      setExportType('');
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <Button
        variant="default"
        onClick={() => handleExport('pdf', onExportPDF)}
        disabled={isExporting}
        loading={isExporting && exportType === 'pdf'}
        iconName="FileText"
        iconPosition="left"
        className="flex-1 sm:flex-none"
      >
        {isExporting && exportType === 'pdf' ? 'Exporting...' : 'Export PDF'}
      </Button>
    </div>
  );
};

export default ExportActions;