import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { id: 'upload', label: 'Upload', path: '/document-upload', icon: 'Upload', tooltip: 'Upload documents for analysis' },
    { id: 'analysis', label: 'Analysis', path: '/analysis-report', icon: 'BarChart3', tooltip: 'View analysis reports and insights' },
    { id: 'chat', label: 'Chat', path: '/ai-chatbot', icon: 'MessageSquare', tooltip: 'Chat with AI about your documents' }
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement?.classList?.toggle('dark');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActiveTab = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Icon name="FileText" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground">DocAnalyzer Pro</span>
        </div>

        {/* Navigation Tabs */}
        <nav className="ml-12 flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.id}
              onClick={() => handleNavigation(item?.path)}
              className={`
                relative flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-out
                ${isActiveTab(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }
              `}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
              {isActiveTab(item?.path) && (
                <div className="absolute -bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={18} />
          </Button>

          {/* User Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            title="User menu"
          >
            <Icon name="User" size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;