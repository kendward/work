import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateProjectCard() {
  return (
    <div className='w-full  md:max-w-[330px] flex-1 relative bg-[url("/images/project-background.png")] h-[435px] bg-no-repeat bg-cover rounded-lg  flex justify-center items-center gap-16 flex-col'>
      <Link href={"/create-project"}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#2655F5] text-white cursor-pointer">
          <Plus size={18} />
        </div>
      </Link>
      <h5 className='text-white text-2xl font-normal drop-shadow-lg'>New UI Kit</h5>
      <div className=" text-white rounded-lg w-48 h-full absolute left-[calc(100%+20px)] z-10 flex justify-center items-center hidden">
        <svg className='absolute -z-10 top-0 left-0' width="203" height="436" viewBox="0 0 203 436" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.6738 8.1626C17.6738 3.74432 21.2556 0.162598 25.6738 0.162598H194.748C199.166 0.162598 202.748 3.74432 202.748 8.1626V427.163C202.748 431.581 199.166 435.163 194.748 435.163H25.6738C21.2555 435.163 17.6738 431.581 17.6738 427.163V256.954C17.6738 243.817 12.2268 231.268 2.63033 222.296C-0.077594 219.765 -0.144054 215.492 2.48383 212.877L2.79319 212.569C12.3185 203.092 17.6738 190.209 17.6738 176.772V8.1626Z" fill="#9773A9" />
        </svg>
        <p className="text-left font-medium text-xl">Create<br />your first<br /> UI kit</p>
      </div>

    </div>
  )
}

export default CreateProjectCard