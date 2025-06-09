// components/StatsCard.tsx
import React from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  variant = 'primary',
  className = ""
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-100 border-blue-200';
      case 'secondary':
        return 'bg-gray-100 border-gray-200';
      case 'success':
        return 'bg-green-100 border-green-200';
      case 'warning':
        return 'bg-orange-100 border-orange-200';
      case 'error':
        return 'bg-red-100 border-red-200';
      default:
        return 'bg-blue-100 border-blue-200';
    }
  };

  return (
    <div className={`
      rounded-lg border-2 p-6 text-center transition-all duration-200 hover:shadow-md
      ${getVariantStyles()} ${className}
    `}>
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-600 leading-relaxed">
          {title}
        </div>
        <div className="text-3xl font-bold text-gray-900">
          {value}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
