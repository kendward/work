import React from 'react';

interface ToggleSwitchProps {
    isOn?: boolean;
    onColor?: string;
    offColor?: string;
    onChange?: (e: any) => void;
    label?: string;
    hideLabel?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    isOn = false,
    onColor = 'bg-blue-500',
    offColor = 'bg-gray-300',
    label,
    hideLabel,
    onChange,
}) => {

    return (
        <div className="flex items-center">
            {!hideLabel && <span className="mr-2">{label ? label : isOn ? 'On' : 'Off'}</span>}
            <label
                htmlFor='toggle-switch'
                className={`relative inline-block w-[50px] h-6 rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${isOn ? onColor : offColor}`}
            >
                <input
                    type="checkbox"
                    checked={isOn}
                    onChange={onChange}
                    className="absolute opacity-0 w-0 h-0"
                    id='toggle-switch'
                />
                <div
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isOn ? 'translate-x-[26.5px]' : ''}`}
                ></div>
            </label>
        </div>
    );
};

export default ToggleSwitch;
