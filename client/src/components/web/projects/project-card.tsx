"use client"
import useOutsideClick from '@/hooks/useOutsideClick'
import { Ellipsis } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface IProjectCardProps {
  title: string
  date: string
  icon: string
}
function ProjectCard({ date, title, icon }: IProjectCardProps) {
  const [showMenu, setShowMenu] = React.useState(false)
  const menuRef = useOutsideClick(() => {
    setShowMenu(false)
  })
  return (
    <div className='w-full sm:max-w-[330px] flex-1 relative bg-white h-[435px] bg-no-repeat bg-cover rounded-lg overflow-hidden flex justify-center items-center gap-8 flex-col px-4'>
      <Image src={icon} width={70} height={70} alt='icon' />
      <Link href={"/project"}>

        <div className="flex flex-col gap-2 text-center">
          <h4 className='font-semibold text-xl'>{title}</h4>
          <p className='text-sm font-normal'>{date}</p>
        </div>
      </Link>

      <div className="absolute bottom-2 flex justify-between items-center w-full px-6">
        <div className="flex -space-x-4 rtl:space-x-reverse self-end justify-end ">
          <Image width={40} height={40} className="w-10 h-10 object-cover border-2 border-white rounded-full" src="/images/team/2.jpeg" alt="" />
          <Image width={40} height={40} className="w-10 h-10 object-cover border-2 border-white rounded-full" src="/images/team/1.jpeg" alt="" />
          <Image width={40} height={40} className="w-10 h-10 object-cover border-2 border-white rounded-full" src="/images/team/3.jpeg" alt="" />
          <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-[#2A2D30] rounded-full" href="#">+1</a>
        </div>
        <div className="relative">
          <span className='w-8 h-6 flex justify-center items-center cursor-pointer text-[#999999] hover:text-black'><Ellipsis size={20} onClick={() => setShowMenu(true)} /></span>
          {showMenu && <div ref={menuRef} className="absolute w-[160px] h-[147px] rounded-[6px] border-[#DDDEDF] border-1 px-4 py-2 flex flex-col gap-[5px] bottom-[calc(100%+0px)] right-0 bg-white">
            <Link href={"#"} className="text-md font-normal flex-1 text-black">Preview</Link>
            <Link href={"#"} className="text-md font-normal flex-1 text-black">Collaborate</Link>
            <Link href={"#"} className="text-md font-normal flex-1 text-black">Connect Figma</Link>
            <Link href={"#"} className="text-md font-normal flex-1 text-[#F24E1E]">Delete</Link>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ProjectCard