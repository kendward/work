import { Ellipsis } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface IProjectCardProps {
  title: string
  date: string
  icon: string
}
function ProjectCard({ date, title, icon }: IProjectCardProps) {
  return (
    <div className='w-96 sm:min-w-[330px]  sm:max-w-[330px] relative bg-white h-[435px] bg-no-repeat bg-cover rounded-lg overflow-hidden flex justify-center items-center gap-8 flex-col px-4'>
      <Image src={icon} width={70} height={70} alt='icon' />

      <div className="flex flex-col gap-2 text-center">
        <h4 className='font-semibold text-xl'>{title}</h4>
        <p className='text-sm font-normal'>{date}</p>
      </div>
      <div className="absolute bottom-2 flex justify-between items-center w-full px-6">
        <div className="flex -space-x-4 rtl:space-x-reverse self-end justify-end ">
          <Image width={40} height={40} className="w-10 h-10 object-cover border-2 border-white rounded-full" src="/images/team/1.jpeg" alt="" />
          <Image width={40} height={40} className="w-10 h-10 object-cover border-2 border-white rounded-full" src="/images/team/2.jpeg" alt="" />
          <Image width={40} height={40} className="w-10 h-10 object-cover border-2 border-white rounded-full" src="/images/team/3.jpeg" alt="" />
          <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+1</a>
        </div>
        <div className="">
          <Ellipsis size={20} />
        </div>
      </div>
    </div>
  )
}

export default ProjectCard