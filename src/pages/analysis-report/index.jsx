import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import OverallSummaryCard from './components/OverallSummaryCard';
import AnalysisDataTable from './components/AnalysisDataTable';
import SentimentPieChart from './components/SentimentPieChart';
import WordCloudCard from './components/WordCloudCard';
import ExportActions from './components/ExportActions';
import LoadingState from './components/LoadingState';

const AnalysisReport = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    // Simulate data loading
    const loadAnalysisData = async () => {
      try {
        // Mock API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock analysis data
        const mockAnalysisData = {
          summary: {
            totalParagraphs: 45,
            overallSentiment: 'Positive',
            sentimentScore: 0.72,
            keyInsights: [
              "Document demonstrates strong positive sentiment towards regulatory compliance initiatives",
              "Majority of content focuses on implementation strategies and best practices",
              "Notable emphasis on stakeholder engagement and transparency measures"
            ],
            documentType: "Policy Document",
            processingDate: "2025-09-10",
            confidence: 0.89
          },
          sentimentDistribution: [
            { name: 'Positive', value: 42, color: '#059669', count: 18 },
            { name: 'Negative', value: 28, color: '#DC2626', count: 12 },
            { name: 'Neutral', value: 30, color: '#64748B', count: 13 }
          ],
          positiveWords: [
            { text: 'excellent', size: 32, weight: 0.9 },
            { text: 'effective', size: 28, weight: 0.8 },
            { text: 'successful', size: 26, weight: 0.75 },
            { text: 'beneficial', size: 24, weight: 0.7 },
            { text: 'positive', size: 22, weight: 0.65 },
            { text: 'improvement', size: 20, weight: 0.6 },
            { text: 'growth', size: 18, weight: 0.55 },
            { text: 'opportunity', size: 16, weight: 0.5 },
            { text: 'progress', size: 14, weight: 0.45 },
            { text: 'innovation', size: 12, weight: 0.4 }
          ],
          negativeWords: [
            { text: 'challenges', size: 30, weight: 0.85 },
            { text: 'issues', size: 28, weight: 0.8 },
            { text: 'problems', size: 26, weight: 0.75 },
            { text: 'difficulties', size: 24, weight: 0.7 },
            { text: 'concerns', size: 22, weight: 0.65 },
            { text: 'limitations', size: 20, weight: 0.6 },
            { text: 'risks', size: 18, weight: 0.55 },
            { text: 'barriers', size: 16, weight: 0.5 },
            { text: 'constraints', size: 14, weight: 0.45 },
            { text: 'obstacles', size: 12, weight: 0.4 }
          ]
        };

        setAnalysisData(mockAnalysisData);
      } catch (error) {
        console.error('Failed to load analysis data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalysisData();
  }, []);

  const handleExportPDF = async () => {
    // Mock PDF export
    console.log('Exporting PDF...');
  };

  const handleExportMarkdown = async () => {
    // Mock Markdown export
    console.log('Exporting Markdown...');
  };

  const handleNavigateToChat = () => {
    navigate('/ai-chatbot');
  };

  const handleNavigateToUpload = () => {
    navigate('/document-upload');
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Analysis Report</h1>
            <p className="text-muted-foreground">
              Comprehensive sentiment analysis and insights from your uploaded documents
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
            <Button
              variant="outline"
              onClick={handleNavigateToUpload}
              iconName="Upload"
              iconPosition="left"
            >
              Upload New
            </Button>
            <Button
              variant="default"
              onClick={handleNavigateToChat}
              iconName="MessageSquare"
              iconPosition="left"
            >
              Chat with AI
            </Button>
          </div>
        </div>

        {/* Overall Summary */}
        <div className="mb-8">
          <OverallSummaryCard 
            summary={analysisData?.summary} 
            isLoading={false}
          />
        </div>

        {/* Visualization Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sentiment Pie Chart */}
          <SentimentPieChart 
            data={analysisData?.sentimentDistribution}
            isLoading={false}
          />

          {/* Word Clouds */}
          <div className="space-y-6">
            <WordCloudCard 
              type="positive" 
              words={analysisData?.positiveWords}
              isLoading={false}
            />
            <WordCloudCard 
              type="negative" 
              words={analysisData?.negativeWords}
              isLoading={false}
            />
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 sm:mb-0">
            Detailed Analysis
          </h2>
          <ExportActions 
            onExportPDF={handleExportPDF}
            onExportMarkdown={handleExportMarkdown}
          />
        </div>

        {/* Analysis Data Table */}
        <AnalysisDataTable 
          data={[]}
          isLoading={false}
        />

        {/* Footer Actions */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Analysis completed on {new Date()?.toLocaleDateString()} at {new Date()?.toLocaleTimeString()}
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleNavigateToUpload}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Analyze New Document
              </Button>
              <Button
                variant="default"
                onClick={handleNavigateToChat}
                iconName="MessageSquare"
                iconPosition="left"
              >
                Ask Questions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisReport;