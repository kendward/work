import CreateProjectCard from '@/components/web/projects/create-project-card'
import ProjectsHeader from '@/components/web/projects/header'
import ProjectCard from '@/components/web/projects/project-card'
import Link from 'next/link'

function page() {
  return (
    <div className='bg-clr-bg-light min-h-screen transition-all duration-300 ease-in-out'>
      <ProjectsHeader />

      <div className="max-w-screen-xl px-2 md:px-6 py-8 mx-auto">
        <div className="flex gap-5 md:gap-20 pb-8 text-md">
          <Link  href='/' className='text-clr-blue-primary text-md font-normal'>My UI Kits</Link>
          <Link className='text-md text-[#505050] font-normal'  href='/'>Templates</Link>
          <Link className='text-md text-[#505050] font-normal'  href='/'>Archive</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-10 xl:gap-24 mx-auto">
          <CreateProjectCard />
          <ProjectCard title='Corbins' date='Created 1 day ago' icon='/images/svg/klayd-logo-circle.svg' />
          <ProjectCard title='Test' date='Created 3 years ago' icon='/images/coloured-profile.png' />
        </div>
      </div>
      {/* create a simple div */}

    </div>
  )
}

export default page