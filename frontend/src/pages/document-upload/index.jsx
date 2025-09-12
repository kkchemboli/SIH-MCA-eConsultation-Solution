import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FileUploadZone from './components/FileUploadZone';
import FilePreviewCard from './components/FilePreviewCard';
import FileFormatGuide from './components/FileFormatGuide';
import UploadProgress from './components/UploadProgress';
import ActionButtons from './components/ActionButtons';
import ToastNotification from './components/ToastNotification';

const DocumentUpload = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    totalFiles: 0,
    uploadedFiles: 0,
    processingFiles: 0,
    currentFile: '',
    overallProgress: 0
  });
  const [toast, setToast] = useState({
    message: '',
    type: 'info',
    isVisible: false
  });

  const acceptedFormats = ['.pdf', '.doc', '.docx', '.xls', '.xlsx'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, isVisible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, isVisible: false }));
  }, []);

  const validateFile = (file) => {
    const extension = '.' + file?.name?.split('.')?.pop()?.toLowerCase();
    
    if (!acceptedFormats?.includes(extension)) {
      return `File type ${extension} is not supported. Please use PDF, Word, or Excel files.`;
    }
    
    if (file?.size > maxFileSize) {
      return `File size exceeds 10MB limit. Please choose a smaller file.`;
    }
    
    return null;
  };

  const generateFileId = () => {
    return Date.now() + Math.random()?.toString(36)?.substr(2, 9);
  };

  const handleFilesSelected = useCallback((selectedFiles) => {
    const validFiles = [];
    const errors = [];

    selectedFiles?.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors?.push(`${file?.name}: ${error}`);
      } else {
        const fileWithId = {
          id: generateFileId(),
          name: file?.name,
          size: file?.size,
          type: file?.type,
          file: file,
          status: 'pending',
          uploadProgress: 0
        };
        validFiles?.push(fileWithId);
      }
    });

    if (errors?.length > 0) {
      showToast(errors?.[0], 'error');
    }

    if (validFiles?.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      showToast(`${validFiles?.length} file${validFiles?.length !== 1 ? 's' : ''} added successfully`, 'success');
    }
  }, [showToast]);

  const handleRemoveFile = useCallback((fileId) => {
    setFiles(prev => prev?.filter(file => file?.id !== fileId));
    showToast('File removed', 'info');
  }, [showToast]);

  const simulateUpload = async (file) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          resolve();
        }
        
        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { ...f, uploadProgress: Math.round(progress), status: progress === 100 ? 'uploaded' : 'uploading' }
            : f
        ));
      }, 200);
    });
  };

  const simulateProcessing = async (file) => {
    return new Promise((resolve) => {
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, status: 'processing' } : f
      ));
      
      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'processed' } : f
        ));
        resolve();
      }, 1500);
    });
  };

  const handleUpload = async () => {
    const pendingFiles = files?.filter(f => f?.status === 'pending');
    if (pendingFiles?.length === 0) return;

    setIsUploading(true);
    setUploadProgress({
      totalFiles: pendingFiles?.length,
      uploadedFiles: 0,
      processingFiles: 0,
      currentFile: '',
      overallProgress: 0
    });

    try {
      for (let i = 0; i < pendingFiles?.length; i++) {
        const file = pendingFiles?.[i];
        setUploadProgress(prev => ({
          ...prev,
          currentFile: file?.name,
          overallProgress: Math.round((i / pendingFiles?.length) * 100)
        }));

        await simulateUpload(file);
        
        setUploadProgress(prev => ({
          ...prev,
          uploadedFiles: i + 1,
          overallProgress: Math.round(((i + 1) / pendingFiles?.length) * 100)
        }));
      }

      showToast('All files uploaded successfully!', 'success');
    } catch (error) {
      showToast('Upload failed. Please try again.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleStartAnalysis = async () => {
    const uploadedFiles = files?.filter(f => f?.status === 'uploaded');
    if (uploadedFiles?.length === 0) return;

    setIsProcessing(true);
    
    try {
      for (const file of uploadedFiles) {
        await simulateProcessing(file);
      }
      
      showToast('Analysis completed! Redirecting to results...', 'success');
      
      setTimeout(() => {
        navigate('/analysis-report');
      }, 2000);
    } catch (error) {
      showToast('Analysis failed. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearAll = () => {
    setFiles([]);
    setUploadProgress({
      totalFiles: 0,
      uploadedFiles: 0,
      processingFiles: 0,
      currentFile: '',
      overallProgress: 0
    });
    showToast('All files cleared', 'info');
  };

  const hasUploadedFiles = files?.some(f => f?.status === 'uploaded');
  const showProgress = isUploading || isProcessing || uploadProgress?.overallProgress > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Document Upload</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your documents for AI-powered analysis and processing. 
              Supports PDF, Word, and Excel formats for comprehensive insights.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Upload Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upload Zone */}
              <FileUploadZone
                onFilesSelected={handleFilesSelected}
                isUploading={isUploading}
                acceptedFormats={acceptedFormats}
              />

              {/* Upload Progress */}
              {showProgress && (
                <UploadProgress
                  totalFiles={uploadProgress?.totalFiles}
                  uploadedFiles={uploadProgress?.uploadedFiles}
                  processingFiles={uploadProgress?.processingFiles}
                  currentFile={uploadProgress?.currentFile}
                  overallProgress={uploadProgress?.overallProgress}
                  isVisible={showProgress}
                />
              )}

              {/* File Preview Section */}
              {files?.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">
                      Selected Files ({files?.length})
                    </h2>
                  </div>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {files?.map((file, index) => (
                      <div
                        key={file?.id}
                        className="animate-in slide-in-from-left duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <FilePreviewCard
                          file={file}
                          onRemove={handleRemoveFile}
                          isProcessing={isUploading || isProcessing}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <ActionButtons
                files={files}
                onUpload={handleUpload}
                onStartAnalysis={handleStartAnalysis}
                onClearAll={handleClearAll}
                isUploading={isUploading}
                isProcessing={isProcessing}
                hasUploadedFiles={hasUploadedFiles}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <FileFormatGuide />
            </div>
          </div>
        </div>
      </main>
      {/* Toast Notification */}
      <ToastNotification
        message={toast?.message}
        type={toast?.type}
        isVisible={toast?.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};

export default DocumentUpload;