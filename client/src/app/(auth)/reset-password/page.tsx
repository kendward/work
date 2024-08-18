"use client";
import { resetPassword } from '@/actions/auth';
import Button from '@/components/web/common/button'
import Input from '@/components/web/common/Input'
import { WEB_ROUTES } from '@/constants/pages-routes';
import useToaster from '@/hooks/useToaster';
import Image from 'next/image'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState, useTransition } from 'react'

function ResetPassword() {

    // other hooks
    const [isPending, startTransition] = useTransition();
    const params = useSearchParams()

    // use state hooks
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
        token: params.get('token') || ''
    })
    const [message, setMessage] = useState('')


    // custom hooks
    const { showError } = useToaster()


    /**
     * handle form submission for reset password
     * @param e  form event
     * @returns void
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formData.password) return showError('Password is required')
        if (!formData.confirmPassword) return showError('Confirm password is required')
        if (formData.password !== formData.confirmPassword) return showError('Passwords do not match')
        if (!formData.token) return showError('Invalid token')

        startTransition(() => resetPassword(formData).then((res) => {
            if (res.error) {
                if (res?.errors) {
                    Object.entries(res.errors).forEach(([key, value], i: number) => {
                        showError(value as string, {
                            delay: i * 200
                        })
                    }
                    )
                } else {
                    showError(res.message as string)
                }
                return
            }
            setMessage(res.message as string);
            setFormData({
                ...formData,
                password: '',
                confirmPassword: ''
            })
        }).catch((err) => {
            showError(err.message)
        }));

    }

    /**
     * handle form input change
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

            {/* Reset Password Form */}
            <form action="" className='w-full md:w-1/2 lg:w-[400px] p-2 lg:p-8 flex flex-col items-center mb-10 md:mb-28 text-center' onSubmit={handleSubmit}>

                {/* logo */}
                <Image src='/images/logo.png' width={72.4} height={72.4} alt='logo' className='mb-16' />

                {/* heading */}
                <h4 className='text-2xl font-medium text-center my-4 text-clr-dark-primary'>Reset password</h4>

                {/* message */}
                {message && <p className='text-clr-blue-primary text-md font-medium text-center my-6'>{message} <Link href={WEB_ROUTES.LOGIN}>Please signin</Link></p>}

                {/* password input */}
                <Input name='password' type='password' placeholder='New Password' value={formData.password} onChange={handleChange} className='my-2' />

                {/* confirm password input */}
                <Input name='confirmPassword' type='password' placeholder='Retype Password' value={formData.confirmPassword} onChange={handleChange} className='my-2' />

                {/* submit button */}
                <Button type='submit' className='mt-2' disabled={isPending}>{isPending ? "Please wait" : "Change password"}</Button>
            </form>
        </div>
    )
}

export default ResetPassword