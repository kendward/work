"use client";
import { Bell } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AvatarGroup from '../common/avatar-group';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useCurrentUserData } from '@/hooks/useCurrentUserData';

function ProjectsHeader() {
    const [showMenu, setShowMenu] = React.useState(false)
    const menuRef = useOutsideClick(() => setShowMenu(false));

    useCurrentUserData();

    return (
        <div className='px-6 md:px-12 py-8 flex flex-col gap-16 bg-white'>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className='relative w-28 h-10'>
                        <Image src={"/images/svg/klayd-logo.svg"} fill objectFit='contain' alt='logo' />
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <span>Klayd settings</span>
                    <span>
                        <Bell size={20} />
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
            <div className="flex relative justify-center items-center  pb-3">
                <p className='text-center text-2xl font-medium flex-1 w-full min-w-72'>Design isn&apos;t finished until somebody is using it.</p>

                <div className="absolute right-0 -top-1 hidden lg:block">
                    <AvatarGroup />
                </div>
            </div>
        </div>
    )
}

export default ProjectsHeader