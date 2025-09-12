import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const SentimentPieChart = ({ data = null, isLoading = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  const mockData = [
    { name: 'Positive', value: 42, color: '#059669', count: 18 },
    { name: 'Negative', value: 28, color: '#DC2626', count: 12 },
    { name: 'Neutral', value: 30, color: '#64748B', count: 13 }
  ];

  const chartData = data || mockData;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data?.color }}
            />
            <span className="font-medium text-foreground">{data?.name}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <div>Count: {data?.count} paragraphs</div>
            <div>Percentage: {data?.value}%</div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex justify-center mt-4">
        <div className="flex flex-wrap gap-4">
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-sm text-foreground font-medium">
                {entry?.value}
              </span>
              <span className="text-sm text-muted-foreground">
                ({entry?.payload?.count})
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-card border rounded-lg p-6 h-96">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="PieChart" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Sentiment Distribution</h3>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin">
            <Icon name="Loader2" size={32} className="text-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border rounded-lg p-6 h-96 transition-all duration-500 ${isVisible ? 'opacity-100 animate-in fade-in-0' : 'opacity-0'}`}>
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="PieChart" size={24} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Sentiment Distribution</h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        {chartData?.map((item, index) => (
          <div key={index} className="p-3 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold" style={{ color: item?.color }}>
              {item?.value}%
            </div>
            <div className="text-sm text-muted-foreground capitalize">
              {item?.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentimentPieChart;