"use client"
import React, { useState } from 'react'
import ProgressSteps from './progress-steps'
import CreateProjectHeader from './create-project-header'
import ToggleSwitch from '../common/toggle-switch'
import FrameworkSelector from './framework-selector'
import Image from 'next/image'

function CreateProjectForm() {
    const [step, setStep] = useState(1)
    const [selectedPace, setSelectedPace] = useState<string>('medium');
    const [isToggleOn, setIsToggleOn] = useState<boolean>(false);

    const frameworks = [
        { id: 'react', name: 'React', logo: '/images/svg/react-logo.svg' },
        { id: 'vue', name: 'Vue', logo: '/images/svg/vue-logo.svg' },
        { id: 'angular', name: 'Angular', logo: '/images/svg/angular-logo.svg' },
        { id: 'blade', name: 'Blade', logo: '/images/svg/blade-logo.svg' },
    ];


    const handleNext = () => {
        setStep(step >= 5 ? 5 : step + 1)
    }

    const handleBack = () => {
        setStep(step <= 1 ? 1 : step - 1)
    }

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPace(e.target.id);
    };

    const handleToggleChange = (isOn: boolean) => {
        setIsToggleOn(isOn);
    };

    const handleFrameworkChange = (selectedFramework: string) => {
        console.log(`Selected Framework: ${selectedFramework}`);
    };

    return (
        <div className='px-4 md:px-12 py-8 min-h-[calc(100vh-32px)] flex flex-col justify-between'>
            <div className='flex flex-col gap-28'>
                <CreateProjectHeader />
                <div className="max-w-2xl mx-auto">
                    <form action="" className='w-full h-full'>
                        {/* Step 1 */}

                        {step === 1 && (
                            <div className="flex flex-col gap-6">
                                <h2 className='text-2xl md:text-4xl font-light'>How do you want to name your UI Kit?</h2>
                                <div className="flex items-center gap-6">
                                    <div className="flex-1">
                                        <input type="text" className='w-full px-2 py-2 text-3xl border-b-1 border-b-clr-blue-primary border-spacing-2 outline-none font-light' />
                                    </div>
                                    <div className="w-[60px] h-[60px] md:w-[110px] md:h-[110px] rounded-full flex justify-center items-center bg-white text-lg md:text-3xl border-1 border-clr-light-gray text-clr-light-gray font-extralight cursor-pointer hover:bg-clr-blue-primary hover:text-white hover:border-transparent" onClick={handleNext}>Go</div>
                                </div>
                            </div>
                        )}

                        {/* Step 2 */}
                        {step === 2 && (
                            <div className="flex flex-col gap-6">
                                <h2 className='text-2xl md:text-4xl font-light'>Great title! The next step adapts to your current pace.</h2>

                                <div className="flex gap-5 mt-10">
                                    <div className="">
                                        <input
                                            type="radio"
                                            name="pace"
                                            id="slow"
                                            className="hidden"
                                            onChange={handleRadioChange}
                                            checked={selectedPace === 'slow'}
                                        />
                                        <label
                                            htmlFor="slow"
                                            className={`px-8 py-2 flex items-center justify-center cursor-pointer rounded-full ${selectedPace === 'slow'
                                                ? 'bg-clr-blue-primary text-white'
                                                : 'bg-white border-2 border-clr-blue-primary text-black'
                                                }`}
                                        >
                                            <p className="text-lg font-light">Process with creation</p>
                                        </label>
                                    </div>
                                    <div className="">
                                        <input
                                            type="radio"
                                            name="pace"
                                            id="medium"
                                            className="hidden"
                                            onChange={handleRadioChange}
                                            checked={selectedPace === 'medium'}
                                        />
                                        <label
                                            htmlFor="medium"
                                            className={`px-8 py-2 flex items-center justify-center cursor-pointer rounded-full ${selectedPace === 'medium'
                                                ? 'bg-clr-blue-primary text-white'
                                                : 'bg-white border-2 border-clr-blue-primary text-black'
                                                }`}
                                        >
                                            <p className="text-lg font-light">Import from Figma</p>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3 */}
                        {step === 3 && (
                            <div className="flex flex-col gap-6">
                                <h2 className='text-2xl md:text-[34px] font-light leading-[46px]'>Connect a Figma file and import your UI Kit data. Any future edits or additions to this file can be imported automatically</h2>
                                <div className="flex-1 mt-8">
                                    <input type="text" className='w-full px-2 py-2 text-3xl border-b-1 border-b-clr-blue-primary border-spacing-2 outline-none font-light' placeholder='https://figma.com/file/...' />
                                </div>
                                <div className="mt-6 flex justify-between">
                                    <h3 className='text-lg md:text-2xl font-light leading-[33px]'>Import tokens from this file</h3>
                                    <ToggleSwitch
                                        isOn={isToggleOn}
                                        onColor="bg-blue-500"
                                        offColor="bg-gray-300"
                                        onChange={handleToggleChange}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 4 */}
                        {step === 4 && (
                            <div className="flex flex-col gap-6 w-full">
                                <h2 className='text-2xl md:text-[34px] font-light'>Select your freamework</h2>
                                <div className="flex gap-5 mt-6 w-full md:w-[600px]">
                                    <FrameworkSelector frameworks={frameworks}
                                        onChange={handleFrameworkChange} />
                                </div>
                            </div>
                        )}

                        {/* Step 5 */}
                        {step === 5 && (
                            <div className="flex flex-col gap-6">
                                <h2 className='text-3xl md:text-[34px] font-light leading-10'><span className='relative'>
                                    Your new Klayd is ready!
                                    <div className="absolute right-0 top-0 translate-x-12 hidden sm:inline-block">
                                        <Image src="/images/diamond.png" alt="Rocket" width={35} height={35} />
                                    </div>
                                </span><br />Hit that sexy button to see it live.</h2>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {/* Bottom */}
            <ProgressSteps handleBack={handleBack} handleNext={handleNext} step={step} />

        </div>

    )
}

export default CreateProjectForm