import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ToastNotification = ({ 
  message, 
  type = 'info', 
  isVisible, 
  onClose, 
  duration = 5000 
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-success text-success-foreground border-success';
      case 'error':
        return 'bg-error text-error-foreground border-error';
      case 'warning':
        return 'bg-warning text-warning-foreground border-warning';
      default:
        return 'bg-card text-card-foreground border-border';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'CheckCircle2';
      case 'error':
        return 'AlertCircle';
      case 'warning':
        return 'AlertTriangle';
      default:
        return 'Info';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`
        flex items-center space-x-3 p-4 rounded-lg border shadow-lg max-w-md
        ${getToastStyles()}
      `}>
        <Icon name={getIcon()} size={20} className="flex-shrink-0" />
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;