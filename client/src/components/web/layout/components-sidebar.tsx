import { ComponentsMenuList } from '@/constants/project';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function ComponentsSidebar() {
  return (
    <div className='fixed pt-24 md:pt-6 md:static py-6 bg-[#FAFAFA] min-w-[272px] min-h-screen rounded-e-xl' style={{ boxShadow: "5px 0 16px #00000012 !important", zIndex: "10" }}>
      <span className='absolute top-4 right-5 block lg:hidden cursor-pointer'><X /></span>
      <div className="flex flex-col px-4">
        <div className="hidden md:flex justify-center mb-4 px-4 ">
          <Image src='/images/project-logo.png' width={46} height={60} alt='logo' />
        </div>

        <input type="text" className='w-full bg-[#F2F2F2] border-none outline-none text-center font-normal rounded-md my-3 md:my-6 px-4 py-2' placeholder='Search' />
      </div>

      <ul className='flex flex-col gap-1  max-h-[calc(100vh-200px)] overflow-y-auto px-4'>
        {ComponentsMenuList.map((item, index) => (
          <li key={index} className='py-2 px-4 hover:bg-clr-bg-light cursor-pointer rounded-md'>
            <Link href={item.link} className='text-clr-dark-secondary font-medium text-md text-sm hover:text-[#000]'>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ComponentsSidebar;
