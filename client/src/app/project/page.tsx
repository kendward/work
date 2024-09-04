import ComponentsSidebar from '@/components/web/layout/components-sidebar'
import HeaderMain from '@/components/web/layout/header-main'
import React from 'react'

function page() {
  return (
    <div className='flex overflow-y-hidden  h-screen'>
      <ComponentsSidebar />
      <div className="w-full h-screen overflow-y-auto px-6 bg-[#FCFCFC]">
        <HeaderMain />
      </div>
    </div>
  )
}

export default page