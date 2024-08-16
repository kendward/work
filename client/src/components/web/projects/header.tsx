"use client";
import { useCurrentUser } from '@/hooks/use-current-user';
import { Bell } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ProjectsHeader() {
    const user = useCurrentUser()
    return (
        <div className='px-6 md:px-12 py-8 flex flex-col gap-16 bg-white'>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Image src={"/images/svg/klayd-logo.svg"} width={24} height={24} alt='logo' />
                    <span className="text-lg font-medium">Klayd</span>
                </div>

                <div className="flex items-center gap-6">
                    <span>
                        <Bell size={20} />
                    </span>
                    {user && <span>{user?.name}</span>}
                    <Link href='/api/auth/signout'><Image src="/images/profile.png" width={40} height={40} alt='profile' /></Link>
                </div>
            </div>
            <p className='text-center text-2xl font-medium'>Design isn&apos;t finished until somebody is using it.</p>
        </div>
    )
}

export default ProjectsHeader