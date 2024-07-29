import CreateProjectCard from '@/components/web/projects/create-project-card'
import ProjectsHeader from '@/components/web/projects/header'
import ProjectCard from '@/components/web/projects/project-card'
import React from 'react'

function page() {
  return (
    <div className='bg-clr-bg-light min-h-screen transition-all duration-300 ease-in-out'>
        <ProjectsHeader/>
        <div className="max-w-screen-xl px-2 md:px-6 py-8 pt-20 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-20 mx-auto">
          <CreateProjectCard/>
          <ProjectCard title='Corbins' date='Created 1 day ago' icon='/images/logo.png'/>
          <ProjectCard title='Test' date='Created 3 years ago' icon='/images/circle.png'/>
        </div>
    </div>
  )
}

export default page