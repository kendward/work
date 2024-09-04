import AvatarGroup from './avatar-group'
import Image from 'next/image'
import { SlidersHorizontal } from 'lucide-react'

function SheetHeader() {
    return (
        <div className='flex items-center justify-end md:justify-between gap-2 w-full'>
            <h5 className='font-normal hidden md:block text-lg text-black'>You are the Project Owner</h5>

            <div className="flex items-center gap-6 bg-white px-5 py-3 rounded-lg">
                <div className="hidden md:block">
                <AvatarGroup />
                </div>
                <span>
                    <SlidersHorizontal size={20} />
                </span>

                <Image src="/images/profile.png" width={40} height={40} alt='profile' className='cursor-pointer' />
            </div>
        </div>
    )
}

export default SheetHeader