import React from 'react'
import { ITeamMember } from './manage-team'
import Image from 'next/image'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function MemberCard({ member }: { member: ITeamMember }) {
    return (
        <div key={member.id} className="flex items-center space-x-4 mb-8 max-w-2xl">
            <Image width={50} height={50} className="rounded-full" src={`/images/${member.profileImage}`} alt="Profile Image" />
            <div className="flex-1">
                <div className="text-lg font-semibold">{member.projectName}</div>
                <div className="text-sm text-gray-500">{member.email}</div>
            </div>
            <div className="flex items-start">
                {member.isOwner ? (
                    <div className="flex items-center gap-8">
                        <Image src={"/images/svg/diamond.svg"} width={35} height={30} alt='owner' />
                        <div>
                            <div className="text-sm font-semibold">{member.role}</div>
                            <div className="text-xs text-gray-500">It&apos;s you</div>
                        </div>
                    </div>
                ) : (
                    <>
                        {member?.status === "pending" && <div className="flex flex-col items-start gap-1  min-w-[85px]">
                            <button className="text-sm font-semibold capitalize">{member.role}</button>
                            <button className="text-sm text-blue-500">Cancel</button>
                        </div>}
                        {member?.status === "active" && !member.isOwner && <div className="flex flex-col items-start gap-1  min-w-[85px]">
                            <Select defaultValue={member.role}>
                                <SelectTrigger className="min-w-12 max-w-[130px] text-md border-none shadow-none py-0 text-sm font-semibold">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value='editor'>
                                            Editor
                                        </SelectItem>
                                        <SelectItem value='viewer'>
                                            Viewer
                                        </SelectItem>
                                        <SelectItem value='admin'>
                                            Admin
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>}
                    </>
                )}
            </div>
        </div>
    )
}

export default MemberCard