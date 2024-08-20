"use client";
import { useCurrentUser } from '@/hooks/use-current-user';
import { Bell, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ProjectsHeader() {
    const user = useCurrentUser()
    return (
        <div className='px-6 md:px-12 py-8 flex flex-col gap-16 bg-white'>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className='relative w-28 h-10'>
                        <Image src={"/images/klayd-logo-colored.png"} fill objectFit='contain' alt='logo' />
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <span>
                        <Bell size={20} />
                    </span>
                    {user && <span>{user?.name}</span>}
                    <Link href='/api/auth/signout'><Image src="/images/profile.png" width={40} height={40} alt='profile' /></Link>
                </div>
            </div>
            <div className="flex justify-center  pb-3 flex-wrap gap-4">
                <p className='text-center text-2xl font-medium flex-1 w-full min-w-72'>Design isn&apos;t finished until somebody is using it.</p>

                <div className="flex items-center gap-3">
                    <div className="flex -space-x-4 rtl:space-x-reverse self-end justify-end ">
                        <Image width={40} height={40} className="w-10 h-10 object-cover border-2 border-white rounded-full" src="/images/team/1.jpeg" alt="" />
                        <Image width={40} height={40} className="w-10 h-10 object-cover border-2 border-white rounded-full" src="/images/team/2.jpeg" alt="" />
                        <Image width={40} height={40} className="w-10 h-10 object-cover border-2 border-white rounded-full" src="/images/team/3.jpeg" alt="" />
                        <Image width={40} height={40} className="w-10 h-10 object-cover border-2 border-white rounded-full" src="/images/team/4.jpeg" alt="" />
                        <Image width={40} height={40} className="w-10 h-10 object-cover border-2 border-white rounded-full" src="/images/team/4.jpeg" alt="" />
                        <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+5</a>
                    </div>

                    <span className='w-10 h-10 rounded-full border-1 border-gray-800 border-dotted flex justify-center items-center cursor-pointer'>
                        <Plus size={18} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProjectsHeader