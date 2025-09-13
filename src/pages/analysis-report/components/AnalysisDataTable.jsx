import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AnalysisDataTable = ({ data = [], isLoading = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('all');
  const itemsPerPage = 10;

  const mockData = [
    {
      id: 1,
      srNo: 1,
      paraNumber: "1.3",
      summary: "Section 143(3)(g) of the Companies Act, 2013 (“the 2013 Act”) already prescribes a cap on per partner limit on audits of companies. There does not appear to be any need for creation and maintenance of panel of Auditors for Non-Government",
      sentiment: "Negative",
      sentimentScore: 0.9921503067016602
    },
    {
      id: 2,
      srNo: 2,
      paraNumber: "2.4",
      summary: "The ICAI Code of Ethics 2019 already has checks and balances which places restrictions on several non",
      sentiment: "Negative",
      sentimentScore: -0.9749937057495117
    },
    {
      id: 3,
      srNo: 3,
      paraNumber: "3.4",
      summary: "The practice of Joint Audits is already operational in audits of Banks, Insurance companies and PSUs. The same can be extended to other Public Interest Entities (PIEs) beyond a particular threshold.",
      sentiment: "Neutral",
      sentimentScore: 0.12
    },
    {
      id: 4,
      srNo: 4,
      paraNumber: "4.3",
      summary: "Analysis of cost-benefit implications and resource allocation requirements for compliance initiatives.",
      sentiment: "Positive",
      sentimentScore: 0.65
    },
    {
      id: 5,
      srNo: 5,
      paraNumber: "5.2",
      summary: "Identification of potential risks and vulnerabilities in current regulatory framework implementation.",
      sentiment: "Negative",
      sentimentScore: -0.32
    },
    {
      id: 6,
      srNo: 6,
      paraNumber: "6.2",
      summary: "Recommendations for improving transparency and accountability measures in organizational processes.",
      sentiment: "Positive",
      sentimentScore: 0.82
    },
    {
      id: 7,
      srNo: 7,
      paraNumber: "7.4",
      summary: "The existing practice of filing ADT-1 with the required attachments can be continued as filing of engagement letters would amount to too.",
      sentiment: "Neutral",
      sentimentScore: 0.08
    },
    {
      id: 8,
      srNo: 8,
      paraNumber: "8.3",
      summary: "Training and development programs for staff members to ensure effective compliance implementation.",
      sentiment: "Positive",
      sentimentScore: 0.71
    },
    {
      id: 9,
      srNo: 9,
      paraNumber: "9.4",
      summary: "Budget constraints and financial limitations affecting the scope of compliance initiatives.",
      sentiment: "Negative",
      sentimentScore: -0.58
    },
    {
      id: 10,
      srNo: 10,
      paraNumber: "10.2",
      summary: "Timeline and milestone definitions for phased implementation of regulatory compliance measures.",
      sentiment: "Neutral",
      sentimentScore: 0.15
    },
    {
      id: 11,
      srNo: 11,
      paraNumber: "11.4",
      summary: "Success metrics and key performance indicators for measuring compliance effectiveness and organizational impact.",
      sentiment: "Positive",
      sentimentScore: 0.89
    },
    {
      id: 12,
      srNo: 12,
      paraNumber: "12.4",
      summary: "Legal implications and potential consequences of non-compliance with regulatory requirements.",
      sentiment: "Negative",
      sentimentScore: -0.67
    },
    {
      id: 13,
      srNo: 13,
      paraNumber: "13.5",
      summary: "ICAI and SEBI have already laid down several restrictions and procedures for resignation of auditors. ICAI restrictions are also applicable even",
      sentiment: "Positive",
      sentimentScore: 0.9929602742195129
    },
  ];

  const tableData = data?.length > 0 ? data : mockData;

  const filteredData = useMemo(() => {
    return tableData?.filter(item => {
      const matchesSearch = item?.summary?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           item?.paraNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesSentiment = sentimentFilter === 'all' || 
                              item?.sentiment?.toLowerCase() === sentimentFilter?.toLowerCase();
      return matchesSearch && matchesSentiment;
    });
  }, [tableData, searchTerm, sentimentFilter]);

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData?.slice(startIndex, startIndex + itemsPerPage);

  const getSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'text-success bg-success/10';
      case 'negative': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'TrendingUp';
      case 'negative': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e?.target?.value);
    setCurrentPage(1);
  };

  const handleSentimentFilter = (sentiment) => {
    setSentimentFilter(sentiment);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="bg-card border rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-48 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)]?.map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-foreground">Analysis Results</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search paragraphs..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 w-full sm:w-64"
              />
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={sentimentFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSentimentFilter('all')}
              >
                All
              </Button>
              <Button
                variant={sentimentFilter === 'positive' ? 'success' : 'outline'}
                size="sm"
                onClick={() => handleSentimentFilter('positive')}
              >
                Positive
              </Button>
              <Button
                variant={sentimentFilter === 'negative' ? 'danger' : 'outline'}
                size="sm"
                onClick={() => handleSentimentFilter('negative')}
              >
                Negative
              </Button>
              <Button
                variant={sentimentFilter === 'neutral' ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => handleSentimentFilter('neutral')}
              >
                Neutral
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">Sr. No</th>
              <th className="text-left p-4 font-medium text-foreground">Para Number</th>
              <th className="text-left p-4 font-medium text-foreground">Summary</th>
              <th className="text-left p-4 font-medium text-foreground">Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((item, index) => (
              <tr 
                key={item?.id} 
                className="border-b hover:bg-muted/20 transition-colors animate-in slide-in-from-left-2 duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="p-4 text-foreground font-medium">{item?.srNo}</td>
                <td className="p-4 text-foreground font-mono text-sm">{item?.paraNumber}</td>
                <td className="p-4 text-muted-foreground max-w-md">
                  <p className="line-clamp-2">{item?.summary}</p>
                </td>
                <td className="p-4">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(item?.sentiment)}`}>
                    <Icon name={getSentimentIcon(item?.sentiment)} size={14} />
                    <span>{item?.sentiment}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredData?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
          <p className="text-muted-foreground text-center">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData?.length)} of {filteredData?.length} results
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-1">
              {[...Array(Math.min(5, totalPages))]?.map((_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="w-8 h-8"
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisDataTable;