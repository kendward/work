import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CreateProjectHeader() {
    return (
        <>
            <div className="flex justify-between items-center">
                <Link href={"/"}>
                    <div className="flex items-center gap-2">
                        <Image src={"/images/svg/klayd-logo-colored.svg"} width={24} height={24} alt='logo' />
                        <span className="text-lg font-medium">Klayd</span>
                    </div>
                </Link>

                <div className="flex items-center gap-2 text-clr-dark-secondary">
                    <span className='mb-3'>
                        ___
                    </span>
                    <Link href='/' className=' text-lg font-light'>Dashboard</Link>
                </div>
            </div>
        </>
    )
}

export default CreateProjectHeader