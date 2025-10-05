import React from 'react';
import { Shield } from 'lucide-react';

interface LogoProps {
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default', 
  size = 'md',
  showText = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: { icon: 'h-5 w-5', text: 'text-base' },
    md: { icon: 'h-6 w-6', text: 'text-lg' },
    lg: { icon: 'h-8 w-8', text: 'text-xl' }
  };

  const variantClasses = {
    default: { icon: 'text-primary', text: 'text-foreground' },
    light: { icon: 'text-white', text: 'text-white' },
    dark: { icon: 'text-gray-900', text: 'text-gray-900' }
  };

  const iconSize = sizeClasses[size].icon;
  const textSize = sizeClasses[size].text;
  const iconColor = variantClasses[variant].icon;
  const textColor = variantClasses[variant].text;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Shield className={`${iconSize} ${iconColor}`} />
      {showText && (
        <span className={`font-bold ${textSize} ${textColor}`}>
          Sheba Cred
        </span>
      )}
    </div>
  );
};

export default Logo;
