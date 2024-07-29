import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-4 w-full text-lg font-medium bg-clr-background-light text-clr-dark-secondary rounded-md ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
