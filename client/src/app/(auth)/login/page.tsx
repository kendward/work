"use client";
import Button from '@/components/web/common/button'
import Input from '@/components/web/common/Input'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';
// import { signIn } from '@/utils/auth';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

function LoginPage() {

    // login form state
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    // handle form submission

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                // redirectTo: DEFAULT_LOGIN_REDIRECT,
            });
        } catch (error) {
            console.log(error)
        }
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

            {/* Login Form */}
            <form action="" className='w-full md:w-1/2 lg:w-[400px] p-2 lg:p-8 flex flex-col items-center mb-10 md:mb-28 text-center' onSubmit={handleSubmit}>

                {/* logo */}
                <Image src='/images/logo.png' width={72.4} height={72.4} alt='logo' className='mb-16' />

                {/* heading */}
                <h4 className='text-2xl font-medium text-center my-4 text-clr-dark-primary'>Sign in Klayd</h4>

                {/* email input */}
                <Input name='email' type='text' placeholder='E-mail Address' value={formData.email} onChange={handleChange} className='my-2' />

                {/* password input */}
                <Input name='password' type='password' placeholder='Password' value={formData.password} onChange={handleChange} className='my-2' />

                {/* forget password link */}
                <div className='text-right w-full my-2'>
                    <Link href='/forgot-password' className='text-clr-dark-primary text-md font-semibold'>Forgot Password?</Link>
                </div>

                {/* submit button */}
                <Button type='submit' className='mt-2'>Continue</Button>

                <p className='text-md mt-10 font-semibold'>New User? <Link href='/register' className='text-clr-blue-primary'>Create an Account</Link></p>
            </form>
        </div>
    )
}

export default LoginPage