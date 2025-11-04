import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'px-6 py-2 rounded-md font-medium transition-all duration-200 shadow-button hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-accent-orange text-white hover:bg-opacity-90',
    secondary: 'bg-primary text-white hover:bg-primary-dark',
    danger: 'bg-accent-red text-white hover:bg-opacity-90',
    success: 'bg-accent-green text-white hover:bg-opacity-90',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

