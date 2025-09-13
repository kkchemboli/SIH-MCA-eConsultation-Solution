import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import Icon from '../../../components/AppIcon';

const ChatArea = ({ messages = [], isTyping = false, className = '' }) => {
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (messages?.length === 0 && !isTyping) {
    return (
      <div className={`flex-1 flex items-center justify-center bg-background ${className}`}>
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MessageSquare" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Start a conversation
          </h3>
          <p className="text-muted-foreground text-sm mb-6">
            Ask me anything about your uploaded documents. I can help you analyze, summarize, and extract insights from your files.
          </p>
          
          {/* Suggested Questions */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Try asking:
            </p>
            <div className="space-y-2">
              {[
                "What are the key points in my documents?",
                "Can you summarize the main findings?",
                "What sentiment patterns do you see?",
                "Are there any important recommendations?"
              ]?.map((suggestion, index) => (
                <div
                  key={index}
                  className="text-sm text-muted-foreground bg-muted/50 rounded-md px-3 py-2 text-left"
                >
                  "{suggestion}"
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={chatContainerRef}
      className={`flex-1 overflow-y-auto bg-background p-4 ${className}`}
    >
      <div className="max-w-4xl mx-auto">
        {messages?.map((message, index) => (
          <ChatMessage
            key={message?.id || index}
            message={message?.content}
            isUser={message?.isUser}
            timestamp={message?.timestamp}
          />
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <ChatMessage
            message=""
            isUser={false}
            isTyping={true}
            timestamp={new Date().toISOString()}
          />
        )}
        
        {/* Scroll Anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatArea;