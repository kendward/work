import AvatarGroup from './avatar-group'
import Image from 'next/image'
import { SlidersHorizontal } from 'lucide-react'
import useOutsideClick from '@/hooks/useOutsideClick';
import { useState } from 'react';
import Link from 'next/link';

function SheetHeader() {
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useOutsideClick(() => setShowMenu(false));

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

                <div className="relative">
                    <Image onClick={() => setShowMenu(true)} src="/images/profile.png" width={40} height={40} alt='profile' className='cursor-pointer' />
                    {showMenu && <div ref={menuRef} className="absolute w-[203px] h-[274px] top-[calc(100%+30px)] -right-6  border-1 border-[#A1A4AF] rounded-[6px] bg-white z-10">
                        <div className="absolute w-6 h-6 border-t-1 border-t-[#A1A4AF] border-r-1 border-r-[#A1A4AF] bg-white rotate-[-45deg] right-8 -top-[12.6px]"></div>
                        <ul className='p-0 m-0 flex flex-col h-full'>
                            <li className='list-none cursor-pointer flex-1 border-b-1 flex justify-center items-center py-4 border-y-[#A1A4AF] text-[#A1A4AF] text-lg font-normal hover:text-black'>Dashboard</li>
                            <li className='list-none cursor-pointer flex-1 border-b-1 flex justify-center items-center py-4 border-y-[#A1A4AF] text-[#A1A4AF] text-lg font-normal hover:text-black'>My Profile</li>
                            <li className='list-none cursor-pointer flex-1 border-b-1 flex justify-center items-center py-4 border-y-[#A1A4AF] text-[#A1A4AF] text-lg font-normal hover:text-black'>Legal</li>
                            <li className='list-none cursor-pointer flex-1 border-b-1 flex justify-center items-center py-4 border-t-[#A1A4AF] text-[#A1A4AF] text-lg font-normal hover:text-black'>
                                <Link href={"/api/auth/signout"} className='block w-full h-full text-center'>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default SheetHeader