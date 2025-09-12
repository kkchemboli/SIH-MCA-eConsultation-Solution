import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WordCloudCard = ({ type = 'positive', words = null, isLoading = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  const mockPositiveWords = [
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
  ];

  const mockNegativeWords = [
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
  ];

  const wordData = words || (type === 'positive' ? mockPositiveWords : mockNegativeWords);
  
  const getTypeConfig = () => {
    switch (type) {
      case 'positive':
        return {
          title: 'Positive Keywords',
          icon: 'TrendingUp',
          color: 'text-success',
          bgColor: 'bg-success/5',
          borderColor: 'border-success/20'
        };
      case 'negative':
        return {
          title: 'Negative Keywords',
          icon: 'TrendingDown',
          color: 'text-error',
          bgColor: 'bg-error/5',
          borderColor: 'border-error/20'
        };
      default:
        return {
          title: 'Keywords',
          icon: 'Hash',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/5',
          borderColor: 'border-muted/20'
        };
    }
  };

  const config = getTypeConfig();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, type === 'positive' ? 400 : 600);
    return () => clearTimeout(timer);
  }, [type]);

  const getWordColor = (weight) => {
    if (type === 'positive') {
      return `rgba(5, 150, 105, ${0.4 + weight * 0.6})`;
    } else {
      return `rgba(220, 38, 38, ${0.4 + weight * 0.6})`;
    }
  };

  const getRandomPosition = (index) => {
    const positions = [
      { top: '10%', left: '15%' },
      { top: '25%', left: '60%' },
      { top: '40%', left: '20%' },
      { top: '15%', left: '75%' },
      { top: '55%', left: '45%' },
      { top: '70%', left: '25%' },
      { top: '30%', left: '80%' },
      { top: '80%', left: '60%' },
      { top: '60%', left: '10%' },
      { top: '45%', left: '70%' }
    ];
    return positions?.[index % positions?.length];
  };

  if (isLoading) {
    return (
      <div className={`bg-card border rounded-lg p-6 h-80 ${config?.bgColor} ${config?.borderColor}`}>
        <div className="flex items-center space-x-3 mb-6">
          <Icon name={config?.icon} size={20} className={config?.color} />
          <h3 className="text-lg font-semibold text-foreground">{config?.title}</h3>
        </div>
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin">
            <Icon name="Loader2" size={24} className="text-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border rounded-lg p-6 h-80 ${config?.bgColor} ${config?.borderColor} transition-all duration-500 ${isVisible ? 'opacity-100 animate-in fade-in-0' : 'opacity-0'}`}>
      <div className="flex items-center space-x-3 mb-6">
        <Icon name={config?.icon} size={20} className={config?.color} />
        <h3 className="text-lg font-semibold text-foreground">{config?.title}</h3>
      </div>
      <div className="relative h-48 overflow-hidden">
        {wordData?.map((word, index) => {
          const position = getRandomPosition(index);
          return (
            <div
              key={index}
              className="absolute transition-all duration-300 hover:scale-110 cursor-default"
              style={{
                top: position?.top,
                left: position?.left,
                fontSize: `${word?.size}px`,
                color: getWordColor(word?.weight),
                fontWeight: Math.floor(400 + word?.weight * 300),
                animationDelay: `${index * 100}ms`
              }}
            >
              {word?.text}
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {wordData?.length} keywords identified
          </span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getWordColor(0.8) }} />
            <span className="text-xs text-muted-foreground">High frequency</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCloudCard;