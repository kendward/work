"use client";
import { forgotPassword } from '@/actions/auth';
import Button from '@/components/web/common/button'
import ErrorMessage from '@/components/web/common/ErrorMessage';
import Input from '@/components/web/common/Input'
import SuccessMessage from '@/components/web/common/SuccessMessage';
import useMessage from '@/hooks/useMessage';
import useToaster from '@/hooks/useToaster';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState, useTransition } from 'react'

function ForgotPassword() {

    // use State Hooks
    const [formData, setFormData] = useState({
        email: ''
    })


    // other hooks
    const [isPending, startTransition] = useTransition();

    // custom hooks
    const { error, success, setErrorMessage, setSuccessMessage } = useMessage();


    /**
     * handle form submission for forgot password
     * @param e  form event
     * @returns void
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formData.email) return setErrorMessage('Email is required')
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return setErrorMessage('Invalid email address')

        startTransition(() => forgotPassword(formData).then((res) => {
            if (res.error) return setErrorMessage(res.message as string)
            setSuccessMessage(res.message as string);
        }).catch((err) => {
            setErrorMessage(err.message)
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
                <Image src='/images/svg/klayd-logo-circle.svg' width={72.4} height={72.4} alt='logo' className='mb-16' />

                {/* heading */}
                <h4 className='text-2xl font-medium text-center my-4 text-clr-dark-primary'>Forgot password</h4>

                {/* messages */}
                <SuccessMessage message={success} className='mt-2 mb-6 text-xl' />
                <ErrorMessage message={error} className='text-sm mt-2 mb-6' />

                {/* email input */}
                <Input type='text' name='email' placeholder='E-mail Address' value={formData.email} onChange={handleChange} className='my-2' />

                {/* submit button */}
                <Button type='submit' className='mt-2' disabled={isPending}>Send password reset link</Button>
            </form>
        </div>
    )
}

export default ForgotPassword