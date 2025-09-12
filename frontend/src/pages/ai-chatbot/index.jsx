import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ChatHeader from './components/ChatHeader';
import ChatArea from './components/ChatArea';
import MessageInput from './components/MessageInput';
import DocumentKnowledgePanel from './components/DocumentKnowledgePanel';
import FileUploadModal from './components/FileUploadModal';

const AIChatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isKnowledgePanelCollapsed, setIsKnowledgePanelCollapsed] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  // Mock documents data
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Financial_Report_Q3_2024.pdf",
      size: 2048000,
      status: "processed",
      progress: 100,
      uploadedAt: new Date('2024-09-08T10:30:00')
    },
    {
      id: 2,
      name: "Market_Analysis_September.docx",
      size: 1536000,
      status: "processed",
      progress: 100,
      uploadedAt: new Date('2024-09-09T14:15:00')
    },
    {
      id: 3,
      name: "Customer_Feedback_Summary.txt",
      size: 512000,
      status: "processing",
      progress: 75,
      uploadedAt: new Date('2024-09-10T09:00:00')
    },
    {
      id: 4,
      name: "Compliance_Guidelines_2024.pdf",
      size: 3072000,
      status: "processed",
      progress: 100,
      uploadedAt: new Date('2024-09-07T16:45:00')
    }
  ]);

  // Initialize with processed documents selected
  useEffect(() => {
    const processedDocs = documents?.filter(doc => doc?.status === 'processed')?.map(doc => doc?.id);
    setSelectedDocuments(processedDocs);
  }, []);

  // Mock initial conversation
  useEffect(() => {
    const initialMessages = [
      {
        id: 1,
        content: "Hello! I'm your AI document assistant. I can help you analyze and extract insights from your uploaded documents. What would you like to know?",
        isUser: false,
        timestamp: new Date(Date.now() - 300000)
      }
    ];
    setMessages(initialMessages);
  }, []);

  const handleSendMessage = async (message) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      content: message,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponses = [
        `Based on your documents, I can see several key insights. The Financial Report Q3 2024 shows strong performance with revenue growth of 15% compared to the previous quarter. The Market Analysis indicates positive trends in customer acquisition.`,
        `Looking at the Customer Feedback Summary, the overall sentiment is positive with 78% satisfaction rate. The main areas for improvement mentioned are response time and product documentation.`,
        `From the Compliance Guidelines 2024, I notice several important regulatory changes that took effect this quarter. Would you like me to highlight the specific requirements that might affect your operations?`,
        `The documents show a correlation between market trends and customer feedback. The September market analysis aligns with the positive customer sentiment, particularly in the technology and service delivery sectors.`,
        `I can help you create a comprehensive summary combining insights from all your documents. Would you like me to focus on any specific aspect like financial performance, customer satisfaction, or compliance requirements?`
      ];

      const randomResponse = aiResponses?.[Math.floor(Math.random() * aiResponses?.length)];
      
      const aiMessage = {
        id: Date.now() + 1,
        content: randomResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000 + Math.random() * 1000);
  };

  const handleFileUpload = async (files) => {
    setIsUploading(true);
    
    // Simulate file upload and processing
    setTimeout(() => {
      const newDocuments = files?.map((file, index) => ({
        id: Date.now() + index,
        name: file?.name,
        size: file?.size,
        status: 'processing',
        progress: 0,
        uploadedAt: new Date()
      }));

      setDocuments(prev => [...prev, ...newDocuments]);
      setIsUploading(false);
      setIsUploadModalOpen(false);

      // Simulate processing progress
      newDocuments?.forEach((doc, index) => {
        setTimeout(() => {
          setDocuments(prev => prev?.map(d => 
            d?.id === doc?.id 
              ? { ...d, status: 'processed', progress: 100 }
              : d
          ));
          
          // Auto-select newly processed documents
          setSelectedDocuments(prev => [...prev, doc?.id]);
        }, (index + 1) * 3000);
      });
    }, 2000);
  };

  const handleDocumentToggle = (documentId, isSelected) => {
    if (isSelected) {
      setSelectedDocuments(prev => [...prev, documentId]);
    } else {
      setSelectedDocuments(prev => prev?.filter(id => id !== documentId));
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 1,
        content: "Chat has been reset. How can I help you with your documents today?",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  const handleUploadMore = () => {
    setIsUploadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <ChatHeader
            onResetChat={handleResetChat}
            onClearHistory={handleClearHistory}
            messageCount={messages?.length}
            isProcessing={isTyping}
            selectedDocumentCount={selectedDocuments?.length}
          />
          
          <ChatArea
            messages={messages}
            isTyping={isTyping}
            className="flex-1"
          />
          
          <MessageInput
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileUpload}
            isLoading={isTyping}
            disabled={selectedDocuments?.length === 0}
          />
        </div>

        {/* Document Knowledge Panel */}
        <DocumentKnowledgePanel
          documents={documents}
          selectedDocuments={selectedDocuments}
          onDocumentToggle={handleDocumentToggle}
          onUploadMore={handleUploadMore}
          isCollapsed={isKnowledgePanelCollapsed}
          onToggleCollapse={() => setIsKnowledgePanelCollapsed(!isKnowledgePanelCollapsed)}
        />
      </div>
      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleFileUpload}
        isUploading={isUploading}
      />
    </div>
  );
};

export default AIChatbot;