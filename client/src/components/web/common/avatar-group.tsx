import { Plus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function AvatarGroup() {
    return (
        <div className="flex items-center gap-3">
            <div className="flex -space-x-5 rtl:space-x-reverse self-end justify-end ">
                <Image width={40} height={40} className="w-10 h-10 object-cover border-2 border-white rounded-full" src="/images/team/1.jpeg" alt="" />
                <Image width={40} height={40} className="w-10 h-10 object-cover border-2 border-white rounded-full" src="/images/team/2.jpeg" alt="" />
                <Image width={40} height={40} className="w-10 h-10 object-cover border-2 border-white rounded-full" src="/images/team/3.jpeg" alt="" />
                <Image width={40} height={40} className="w-10 h-10 object-cover border-2 border-white rounded-full" src="/images/team/4.jpeg" alt="" />
                <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-[#2A2D30] border-2 border-none rounded-full" href="#">+5</a>
            </div>

            <span className='w-10 h-10 rounded-full border-1 border-gray-800 border-dotted flex justify-center items-center cursor-pointer'>
                <Plus size={18} />
            </span>
        </div>
    )
}

export default AvatarGroup