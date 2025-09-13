import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="h-8 bg-muted rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-96 animate-pulse"></div>
        </div>

        {/* Summary Card Loading */}
        <div className="bg-card border rounded-lg p-6 mb-8 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 bg-muted rounded w-48"></div>
            <div className="h-8 bg-muted rounded w-24"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)]?.map((_, i) => (
              <div key={i} className="bg-muted/30 rounded-lg p-4">
                <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                <div className="h-8 bg-muted rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Chart Loading */}
          <div className="bg-card border rounded-lg p-6 h-96 animate-pulse">
            <div className="h-6 bg-muted rounded w-48 mb-6"></div>
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin">
                <Icon name="Loader2" size={32} className="text-primary" />
              </div>
            </div>
          </div>

          {/* Word Clouds Loading */}
          <div className="space-y-6">
            {[...Array(2)]?.map((_, i) => (
              <div key={i} className="bg-card border rounded-lg p-6 h-44 animate-pulse">
                <div className="h-6 bg-muted rounded w-36 mb-4"></div>
                <div className="h-24 bg-muted/20 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Table Loading */}
        <div className="bg-card border rounded-lg animate-pulse">
          <div className="p-6 border-b">
            <div className="h-6 bg-muted rounded w-48"></div>
          </div>
          <div className="p-6">
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
      </div>
    </div>
  );
};

export default LoadingState;