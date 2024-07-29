// create custom advanced resuable dynamic typescipt tailwind css checkbox input that will handle all type of props

import React from 'react';

interface CheckboxProps {
    label: string | React.ReactNode;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
    label,
    checked,
    onChange,
    className = '',
    disabled = false,
}) => {
    return (
        <label className={`flex items-start space-x-2 ${className}`}>
            <input
                type='checkbox'
                checked={checked}
                onChange={onChange}
                className='form-checkbox min-h-5 min-w-5 text-clr-primary rounded-sm border-1 border-clr-primary'
                disabled={disabled}
            />
            <span>{label}</span>
        </label>
    );
};

export default Checkbox;
