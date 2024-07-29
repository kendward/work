import { Plus } from 'lucide-react'
import React from 'react'

function CreateProjectCard() {
  return (
    <div className='w-96 sm:min-w-[330px]  sm:max-w-[330px] relative bg-[url("/images/project-background.png")] h-[435px] bg-no-repeat bg-cover rounded-lg overflow-hidden flex justify-center items-center gap-16 flex-col'>
      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-clr-blue-primary text-white cursor-pointer">
        <Plus size={18}/>
      </div>
      <h5 className='text-white text-2xl font-semibold drop-shadow-lg'>New UI Kit</h5>
    </div>
  )
}

export default CreateProjectCard