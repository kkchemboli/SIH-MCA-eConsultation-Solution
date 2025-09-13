import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OverallSummaryCard = ({ summary, isLoading = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockSummary = {
    totalParagraphs: 13,
    overallSentiment: 'Positive',
    keyInsights: [
      "Section 143(3)(g) of the Companies Act, 2013 already sets limits on audits per partner, reducing the need for additional auditor panels.",
      "The ICAI Code of Ethics 2019 provides existing safeguards and restrictions on non-audit services.",
      "Joint audits are already in practice for banks, insurance companies, and PSUs, and can be extended to other large public interest entities."
    ],
    documentType: "Policy Document",
    processingDate: "2025-09-10",
    confidence: 0.92
  };

  //const data = summary || mockSummary
  const data =  mockSummary;

  const getSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getSentimentBgColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'bg-success/10';
      case 'negative': return 'bg-error/10';
      default: return 'bg-muted/10';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-card border rounded-lg p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-muted rounded w-48"></div>
          <div className="h-8 bg-muted rounded w-24"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="FileText" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Document Summary</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Points</div>
          <div className="text-2xl font-bold text-foreground">{data?.totalParagraphs}</div>
        </div>
        
        <div className={`rounded-lg p-4 ${getSentimentBgColor(data?.overallSentiment)}`}>
          <div className="text-sm text-muted-foreground mb-1">Overall Sentiment</div>
          <div className={`text-2xl font-bold ${getSentimentColor(data?.overallSentiment)}`}>
            {data?.overallSentiment}
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Confidence</div>
          <div className="text-2xl font-bold text-foreground">
            {(data?.confidence * 100)?.toFixed(1)}%
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
          <div className="border-t pt-4">
            <h3 className="font-medium text-foreground mb-3">Key Insights</h3>
            <ul className="space-y-2">
              {data?.keyInsights?.map((insight, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Document Type</div>
              <div className="font-medium text-foreground">{data?.documentType}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Processing Date</div>
              <div className="font-medium text-foreground">{data?.processingDate}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverallSummaryCard;