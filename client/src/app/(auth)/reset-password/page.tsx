"use client";
import Button from '@/components/web/common/button'
import Input from '@/components/web/common/Input'
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

function ResetPassword() {
    // reset password form state
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    })

    // handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
    }

    // handle form input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className='flex-1 flex justify-center items-center w-full h-full'>

            {/* Reset Password Form */}
            <form action="" className='w-full md:w-1/2 lg:w-[400px] p-2 lg:p-8 flex flex-col items-center mb-10 md:mb-28 text-center' onSubmit={handleSubmit}>

                {/* logo */}
                <Image src='/images/logo.png' width={72.4} height={72.4} alt='logo' className='mb-16' />

                {/* heading */}
                <h4 className='text-2xl font-medium text-center my-4 text-clr-dark-primary'>Reset password</h4>

                {/* password input */}
                <Input name='password' type='password' placeholder='New Password' value={formData.password} onChange={handleChange} className='my-2' />

                {/* confirm password input */}
                <Input name='confirmPassword' type='password' placeholder='Retype Password' value={formData.confirmPassword} onChange={handleChange} className='my-2' />

                {/* submit button */}
                <Button type='submit' className='mt-2'>Change password</Button>
            </form>
        </div>
    )
}

export default ResetPassword