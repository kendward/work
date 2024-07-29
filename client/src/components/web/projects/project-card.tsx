import Image from 'next/image'
import React from 'react'

interface IProjectCardProps {
  title: string
  date: string
  icon: string
}
function ProjectCard({date,title, icon}:IProjectCardProps) {
  return (
    <div className='w-96 sm:min-w-[330px]  sm:max-w-[330px] relative bg-white h-[435px] bg-no-repeat bg-cover rounded-lg overflow-hidden flex justify-center items-center gap-8 flex-col'>
      <Image src={icon} width={70} height={70} alt='icon' />

      <div className="flex flex-col gap-2 text-center">
        <h4 className='font-semibold text-xl'>{title}</h4>
        <p className='text-sm font-normal'>{date}</p>
      </div>
    </div>
  )
}

export default ProjectCard