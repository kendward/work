import React from 'react';

interface CircleProgressProps {
    progress: number;
    color: string;
}

const CircleProgress: React.FC<CircleProgressProps> = ({ progress, color }) => {
    const radius = 58;
    const stroke =9;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative w-20 h-20 flex items-center justify-center">
            <svg
                height={radius * 2}
                width={radius * 2}
                className="absolute transform -rotate-90"
            >
                <circle
                    stroke="#d1d5db"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke={color}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
            <div className={`absolute  rounded-full ${progress===100 ? 'bg-clr-blue-primary' : 'bg-gray-300'}`} style={{ width: radius / 3, height: radius / 3 }}></div>
        </div>
    );
};

export default CircleProgress;
