import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WordCloudCard = ({ 
  type = 'positive', 
  image = null, 
  isLoading = false 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const getTypeConfig = () => {
    switch (type) {
      case 'positive':
        return {
          title: 'Positive Keywords',
          icon: 'TrendingUp',
          color: 'text-success',
          bgColor: 'bg-success/5',
          borderColor: 'border-success/20',
          defaultImage: 'positive_suggestions_wordcloud.png'  // <-- your positive image
        };
      case 'negative':
        return {
          title: 'Negative Keywords',
          icon: 'TrendingDown',
          color: 'text-error',
          bgColor: 'bg-error/5',
          borderColor: 'border-error/20',
          defaultImage: 'Negative_suggestions_wordcloud.png'  // <-- your negative image
        };
      default:
        return {
          title: 'Keywords',
          icon: 'Hash',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/5',
          borderColor: 'border-muted/20',
          defaultImage: '/images/default-cloud.png'
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
      <div className="relative h-60 flex items-center justify-center">
        <img 
          src={image || config?.defaultImage} 
          alt={`${config?.title} WordCloud`} 
          className="max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export default WordCloudCard;
