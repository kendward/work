import React from 'react'

function layout({children} : Readonly<{children: React.ReactNode}>) {
  return (
    <div className='bg-white flex justify-center items-center min-h-screen flex-col p-2 md:p-6'>
        {children}
        <footer className='text-sm text-center'>
            <p className='font-medium'>klayd.com | hello@klayd.com</p>
        </footer>
    </div>
  )
}

export default layout