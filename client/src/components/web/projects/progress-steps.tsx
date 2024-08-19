import React from 'react'
import CircleProgress from './circle-progress'

type Props = {
    handleNext: () => void;
    handleBack: () => void;
    step: number;
}

const ProgressSteps = ({ handleBack, handleNext, step }: Props) => {
    return (
        <div className="flex justify-between items-center gap-4 max-w-7xl mx-auto  w-full">
            {step > 1 && <button className='flex-1 outline-none border-none text-clr-blue-primary font-normal text-lg' onClick={handleBack}>Back</button>}
            <div className="flex-1 flex flex-col justify-center mx-auto items-center gap-2">
                <CircleProgress progress={(step / 5) * 100} color='#4a7bf6' />
                <p className='text-center text-black font-normal text-lg mt-1'>Your progress</p>
            </div>
            {step > 1 && step !== 2 ? <div className='flex-1 '>
                <button className='mx-auto w-[60px] h-[60px] md:w-[88px] md:h-[88px] rounded-full bg-clr-blue-primary text-wrap flex justify-center items-center font-light text-xl text-white outline-1 outline-clr-blue-primary outline outline-offset-8' onClick={handleNext}>Next</button>
            </div> : <>
                {step === 2 && <div className='flex-1'></div>}
            </>}
        </div>
    )
}

export default ProgressSteps