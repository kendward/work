"use client";
import { forgotPassword } from '@/actions/auth';
import Button from '@/components/web/common/button'
import Input from '@/components/web/common/Input'
import useToaster from '@/hooks/useToaster';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState, useTransition } from 'react'

function ForgotPassword() {

    // use State Hooks
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        email: ''
    })


    // other hooks
    const [isPending, startTransition] = useTransition();

    // custom hooks
    const { showError } = useToaster()


    /**
     * handle form submission for forgot password
     * @param e  form event
     * @returns void
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formData.email) return showError('Email is required')
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return showError('Invalid email address')

        startTransition(() => forgotPassword(formData).then((res) => {
            if (res.error) return showError(res.message as string)
            setMessage(res.message as string);
        }).catch((err) => {
            showError(err.message)
        }));

    }


    /**
     *  handle form input change
     * @param e  input change event
     * @returns void
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='flex-1 flex justify-center items-center w-full h-full'>

            {/* Forget Password Form */}
            <form action="" className='w-full md:w-1/2 lg:w-[400px] p-2 lg:p-8 flex flex-col items-center mb-10 md:mb-28 text-center' onSubmit={handleSubmit}>

                {/* logo */}
                <Image src='/images/logo.png' width={72.4} height={72.4} alt='logo' className='mb-16' />

                {/* heading */}
                <h4 className='text-2xl font-medium text-center my-4 text-clr-dark-primary'>Forgot password</h4>

                {/* message */}
                {message && <p className='text-clr-blue-primary text-md font-medium text-center my-6'>{message}</p>}
                {/* email input */}
                <Input type='text' name='email' placeholder='E-mail Address' value={formData.email} onChange={handleChange} className='my-2' />

                {/* submit button */}
                <Button type='submit' className='mt-2' disabled={isPending}>Send password reset link</Button>
            </form>
        </div>
    )
}

export default ForgotPassword