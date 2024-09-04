import React from 'react'
import SheetLayout from '../../layout/sheet-layout'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import MemberCard from './member-card'
export interface ITeamMember {
    id: number
    profileImage: string
    projectName: string
    email: string
    role: string
    isOwner: boolean
    status: string
}
function ManageTeamForm() {
    const teamMembers: ITeamMember[] = [
        {
            id: 1,
            profileImage: "profile.png",
            projectName: "[Project name]",
            email: "jamie.ohara@gmail.com",
            role: "UI Kit Owner",
            isOwner: true,
            status: "active"
        },
        {
            id: 2,
            profileImage: "coloured-profile.png",
            projectName: "[Project name]",
            email: "jamie.ohara@gmail.com",
            role: "editor",
            isOwner: false,
            status: "active"
        },
        {
            id: 3,
            profileImage: "coloured-profile.png",
            projectName: "Pending",
            email: "jamie.ohara@gmail.com",
            role: "editor",
            isOwner: false,
            status: "pending"
        }
    ];

    return (
        <SheetLayout>
            <h3 className='font-bold text-lg mb-4'>Invite team member or change ownership</h3>

            <form action="" className='w-full'>
                <div className="flex gap-10 mt-10 mb-6 w-full h-[50px]">
                    <div className="flex w-full">
                        <Input type='text' placeholder='Enter email' className='flex-grow' />
                        <Select defaultValue='editor'>
                            <SelectTrigger className="min-w-12 max-w-[130px] text-md font-medium">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='editor'>
                                        Invite Editor
                                    </SelectItem>
                                    <SelectItem value='viewer'>
                                        Invite Viewer
                                    </SelectItem>
                                    <SelectItem value='admin'>
                                        Invite Admin
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button variant={"outline"} className='h-full px-10 bg-transparent text-md border-[#8F8F8F]'>
                        Send
                    </Button>
                </div>
            </form>

            {teamMembers.map(member => (
                <MemberCard key={member.id} member={member} />
            ))}
        </SheetLayout>
    )
}

export default ManageTeamForm