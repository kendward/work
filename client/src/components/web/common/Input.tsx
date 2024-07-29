import React from 'react';

interface InputProps {
    type: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean;
    props?: React.InputHTMLAttributes<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
    type,
    name,
    placeholder,
    value,
    onChange,
    className = '',
    disabled = false,
    ...props
}) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`px-4 py-4 w-full text-md font-semibold placeholder:font-normal text-clr-dark-secondary rounded-md border-1 border-clr-light-gray outline-none ${className}`}
            disabled={disabled}
            {...props}
        />
    );
};

export default Input;