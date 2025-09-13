import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ 
  onResetChat, 
  onClearHistory, 
  messageCount = 0,
  isProcessing = false,
  selectedDocumentCount = 0 
}) => {
  const handleResetChat = () => {
    if (window.confirm('Are you sure you want to reset the current chat? This will clear all messages in the current conversation.')) {
      onResetChat();
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all chat history? This action cannot be undone.')) {
      onClearHistory();
    }
  };

  return (
    <div className="border-b bg-card p-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Chat Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Icon name="MessageSquare" size={16} color="white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">AI Document Chat</h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{messageCount} messages</span>
                <span>•</span>
                <span>{selectedDocumentCount} documents active</span>
                {isProcessing && (
                  <>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Loader2" size={12} className="animate-spin" />
                      <span>Processing...</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetChat}
            iconName="RotateCcw"
            iconPosition="left"
            disabled={messageCount === 0}
            title="Reset current chat conversation"
          >
            Reset Chat
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearHistory}
            iconName="Trash2"
            iconPosition="left"
            disabled={messageCount === 0}
            title="Clear all chat history"
          >
            Clear History
          </Button>
        </div>
      </div>

      {/* Status Bar */}
      {selectedDocumentCount === 0 && (
        <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm text-warning">
              No documents selected. Please select documents from the knowledge base to enable AI responses.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;