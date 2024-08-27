import { TriangleAlert, AlertCircle } from 'lucide-react';
import React from 'react';

function InputMessageBox({ type = 'warning', message }: { type?: 'warning' | 'error', message: string | undefined }) {
  const icon = type === 'error' ? <AlertCircle className='text-red-500' size={20}/> : <TriangleAlert className='text-yellow-500' size={20}/>;
  const textColor = type === 'error' ? 'text-red-500' : 'text-yellow-500';

  return (
    <div className='absolute -bottom-1 left-0 rounded-md  px-3  drop-shadow-xl  bg-white flex items-center w-fit text-left z-50 font-normal' style={{filter:"drop-shadow(0 0 5px #00000022)"}}>
      <div className="absolute bg-white drop-shadow-lg w-8 h-8 -rotate-45 -translate-y-2 left-5 shadow-2xl"></div>
      <span className='z-10 flex items-center gap-2 w-full whitespace-nowrap bg-white  px-0 py-2 '>
        {icon}
        <span className={`${textColor} text-sm`}>{message}</span>
      </span>
    </div>
  );
}

export default InputMessageBox;
