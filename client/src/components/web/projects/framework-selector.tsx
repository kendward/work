import Image from 'next/image';
import React, { useState } from 'react';

interface FrameworkSelectorProps {
    frameworks: { id: string; name: string; logo: string }[];
    selectedFramework?: string;
    onChange?: (selectedFramework: string) => void;
}

const FrameworkSelector: React.FC<FrameworkSelectorProps> = ({
    frameworks,
    selectedFramework = '',
    onChange,
}) => {
    const [selected, setSelected] = useState<string>(selectedFramework);

    const handleSelection = (id: string) => {
        setSelected(id);
        if (onChange) {
            onChange(id);
        }
    };

    return (
        <div className="flex justify-between items-center w-full gap-5">
            {frameworks.map((framework) => (
                <div key={framework.id} className="text-center">
                    <input
                        type="radio"
                        name="framework"
                        id={framework.id}
                        className="hidden"
                        onChange={() => handleSelection(framework.id)}
                        checked={selected === framework.id}
                    />
                    <label
                        htmlFor={framework.id}
                        className={`flex flex-col items-center cursor-pointer`}
                    >
                        <div className={`w-20 h-20 flex items-center justify-center rounded-full ${selected === framework.id
                            ? 'bg-blue-100'
                            : 'bg-gray-100'
                            }`}>
                            <Image
                                src={framework.logo}
                                alt={framework.name}
                                width={40}
                                height={40}
                            />
                        </div>
                        <span className={` mt-2 font-semibold text-center ${selected === framework.id
                            ? 'text-clr-blue-primary '
                            : 'text-gray'
                            }`}>{framework.name}</span>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default FrameworkSelector;
