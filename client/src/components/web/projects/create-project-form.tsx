"use client"
import React, { useState } from 'react'
import ProgressSteps from './progress-steps'
import CreateProjectHeader from './create-project-header'
import ToggleSwitch from '../common/toggle-switch'
import FrameworkSelector from './framework-selector'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

function CreateProjectForm() {
    const [step, setStep] = useState(1)
    const [selectedPace, setSelectedPace] = useState<"figma" | "creation">('figma');
    const [isToggleOn, setIsToggleOn] = useState<boolean>(false);
    const router = useRouter()
    
    // const frameworks = [
    //     { id: 'react', name: 'React', logo: '/images/svg/react-logo.svg' },
    //     { id: 'vue', name: 'Vue', logo: '/images/svg/vue-logo.svg' },
    //     { id: 'angular', name: 'Angular', logo: '/images/svg/angular-logo.svg' },
    //     { id: 'blade', name: 'Blade', logo: '/images/svg/blade-logo.svg' },
    // ];


    const handleNext = () => {
        if(step === 4) {
            router.push('/')
        }else{
            setStep(step + 1)
        }
    }

    const handleBack = () => {
        setStep(step <= 1 ? 1 : step - 1)
    }

    const handlePaceSelect = (pace: "figma" | "creation") => {
        setSelectedPace(pace);
        if (pace === "figma") {
            setStep(3);
        } else {
            setStep(4);
        }
    };

    const handleToggleChange = (isOn: boolean) => {
        setIsToggleOn(isOn);
    };

    const handleFrameworkChange = (selectedFramework: string) => {
        console.log(`Selected Framework: ${selectedFramework}`);
    };

    return (
        <div className='px-4 md:px-12 py-8 min-h-[calc(100vh-32px)] flex flex-col justify-between'>
            <div className='flex flex-col gap-20'>
                <CreateProjectHeader />
                <div className="max-w-2xl mx-auto">
                    <form action="" className='w-full h-full'>
                        {/* Step 1 */}

                        {step === 1 && (
                            <div className="flex flex-col gap-4">
                                <h2 className='text-2xl md:text-4xl font-light'>How do you want to name your UI Kit?</h2>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <input type="text" className='w-full px-2 py-2 text-xl md:text-3xl border-b-1 border-b-clr-blue-primary border-spacing-2 outline-none font-light' />
                                    </div>
                                    <div className="w-[60px] h-[60px] md:w-[90px] md:h-[90px] rounded-full flex justify-center items-center bg-white text-lg md:text-2xl border-1 border-clr-light-gray text-clr-light-gray font-extralight cursor-pointer hover:bg-clr-blue-primary hover:text-white hover:border-transparent" onClick={handleNext}>Go</div>
                                </div>
                            </div>
                        )}

                        {/* Step 2 */}
                        {step === 2 && (
                            <div className="flex flex-col gap-6">
                                <h2 className='text-2xl md:text-4xl font-light'>Great title! The next step adapts to your current pace.</h2>

                                <div className="flex items-center flex-wrap gap-5 mt-6">
                                    <label
                                        htmlFor="slow"
                                        className={`px-4 md:px-8 py-2 flex items-center flex-grow md:flex-grow-0 justify-center cursor-pointer rounded-full bg-white border-2 border-clr-blue-primary text-black`}
                                        onClick={() => handlePaceSelect("creation")}
                                    >
                                        <p className="text-lg font-light">Process with creation</p>
                                    </label>


                                    <label
                                        htmlFor="medium"
                                        className={`px-4 md:px-8 py-2 flex items-center justify-center flex-grow md:flex-grow-0 cursor-pointer rounded-full bg-clr-blue-primary text-white`}
                                        onClick={() => handlePaceSelect("figma")}
                                    >
                                        <p className="text-lg font-light">Import from Figma</p>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Step 3 */}
                        {step === 3 && (
                            <div className="flex flex-col gap-2">
                                <h2 className='text-2xl md:text-[34px] font-light leading-[46px]'>Connect a Figma file and import your UI Kit data. Any future edits or additions to this file can be imported automatically</h2>
                                <div className="flex-1 mt-4">
                                    <input type="text" className='w-full px-2 py-2 text-xl md:text-3xl border-b-1 border-b-clr-blue-primary border-spacing-2 outline-none font-light' placeholder='https://figma.com/file/...' />
                                </div>
                                <div className="mt-2 flex justify-between">
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
                        {/* {step === 4 && (
                            <div className="flex flex-col gap-4 w-full">
                                <h2 className='text-2xl md:text-[34px] font-light'>Select your freamework</h2>
                                <div className="flex gap-5 mt-8 w-full md:w-[500px]">
                                    <FrameworkSelector frameworks={frameworks}
                                        onChange={handleFrameworkChange} />
                                </div>
                            </div>
                        )} */}

                        {/* Step 4 */}
                        {step === 4 && (
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