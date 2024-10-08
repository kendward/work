import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CreateProjectHeader() {
    return (
        <>
            <div className="flex justify-between items-center">
                <Link href={"/"}>
                    <div className="flex items-center gap-2">
                        <div className='relative w-28 h-10'>
                        <Image src={"/images/svg/klayd-logo.svg"} fill objectFit='contain' alt='logo' />
                        </div>
                    </div>
                </Link>

                <div className="flex items-center gap-2 text-clr-dark-secondary">
                    <span className='mb-3'>
                        ___
                    </span>
                    <Link href='/' className=' text-md font-light'>Dashboard</Link>
                </div>
            </div>
        </>
    )
}

export default CreateProjectHeader