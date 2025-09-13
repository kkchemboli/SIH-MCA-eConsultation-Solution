import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ onSendMessage, onFileUpload, isLoading = false, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !isLoading && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef?.current?.scrollHeight, 120)}px`;
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    if (files?.length > 0 && onFileUpload) {
      onFileUpload(files);
    }
    // Reset input
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    if (files?.length > 0 && onFileUpload) {
      onFileUpload(files);
    }
  };

  const characterCount = message?.length;
  const maxCharacters = 2000;

  return (
    <div className="border-t bg-background p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* File Drop Zone Overlay */}
        {isDragOver && (
          <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-lg flex items-center justify-center z-10">
            <div className="text-center">
              <Icon name="Upload" size={32} className="text-primary mx-auto mb-2" />
              <p className="text-primary font-medium">Drop files here to add to knowledge base</p>
            </div>
          </div>
        )}

        {/* Message Input Area */}
        <div 
          className={`relative border rounded-lg transition-colors ${
            isDragOver ? 'border-primary bg-primary/5' : 'border-border'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your documents..."
            disabled={disabled || isLoading}
            className="w-full px-4 py-3 pr-24 bg-transparent border-none resize-none focus:outline-none focus:ring-0 min-h-[44px] max-h-[120px]"
            rows={1}
          />
          
          {/* Action Buttons */}
          <div className="absolute right-2 bottom-2 flex items-center space-x-1">
            {/* File Upload Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef?.current?.click()}
              disabled={disabled || isLoading}
              className="h-8 w-8"
              title="Upload additional documents"
            >
              <Icon name="Paperclip" size={16} />
            </Button>

            {/* Send Button */}
            <Button
              type="submit"
              variant="default"
              size="icon"
              disabled={!message?.trim() || disabled || isLoading}
              className="h-8 w-8"
              title="Send message"
            >
              {isLoading ? (
                <Icon name="Loader2" size={16} className="animate-spin" />
              ) : (
                <Icon name="Send" size={16} />
              )}
            </Button>
          </div>
        </div>

        {/* Character Count and File Input */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Press Enter to send, Shift+Enter for new line</span>
          </div>
          <span className={characterCount > maxCharacters ? 'text-error' : ''}>
            {characterCount}/{maxCharacters}
          </span>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.md"
          onChange={handleFileSelect}
          className="hidden"
        />
      </form>
    </div>
  );
};

export default MessageInput;