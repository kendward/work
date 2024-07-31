import React, { useState } from 'react';

interface ToggleSwitchProps {
    isOn?: boolean;
    onColor?: string;
    offColor?: string;
    onChange?: (isOn: boolean) => void;
    label?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    isOn = false,
    onColor = 'bg-blue-500',
    offColor = 'bg-gray-300',
    label,
    onChange,
}) => {
    const [toggle, setToggle] = useState<boolean>(isOn);

    const handleToggle = () => {
        setToggle(!toggle);
        if (onChange) {
            onChange(!toggle);
        }
    };

    return (
        <div className="flex items-center">
            <span className="mr-2">{label || toggle ? 'On' : 'Off'}</span>
            <div
                className={`relative inline-block w-11 h-6 rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${toggle ? onColor : offColor}`}
                onClick={handleToggle}
            >
                <div
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${toggle ? 'translate-x-5' : ''}`}
                ></div>
            </div>
        </div>
    );
};

export default ToggleSwitch;
