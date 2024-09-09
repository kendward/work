"use client";
import { resetPassword } from '@/actions/auth';
import Button from '@/components/web/common/button'
import ErrorMessage from '@/components/web/common/ErrorMessage';
import Input from '@/components/web/common/Input'
import SuccessMessage from '@/components/web/common/SuccessMessage';
import { WEB_ROUTES } from '@/constants/pages-routes';
import useMessage from '@/hooks/useMessage';
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
    const { error, success, setErrorMessage, setSuccessMessage, clearMessages } = useMessage();



    /**
     * handle form submission for reset password
     * @param e  form event
     * @returns void
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formData.password) return setErrorMessage('Password is required')
        if (!formData.confirmPassword) return setErrorMessage('Confirm password is required')
        if (formData.password !== formData.confirmPassword) return setErrorMessage('Passwords do not match')
        if (!formData.token) return setErrorMessage('Invalid token')

        startTransition(() => resetPassword(formData).then((res) => {
            if (res.error) {
                if (res?.errors) {
                    setErrorMessage(Object.values(res.errors)?.join(', '))
                } else {
                    setErrorMessage(res.message as string)
                }
                return
            }
            setSuccessMessage(res.message as string);
            setFormData({
                ...formData,
                password: '',
                confirmPassword: ''
            })
        }).catch((err) => {
            setErrorMessage(err.message)
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
                <Image src='/images/svg/klayd-logo-circle.svg' width={72.4} height={72.4} alt='logo' className='mb-16' />

                {/* heading */}
                <h4 className='text-2xl font-medium text-center my-4 text-clr-dark-primary'>Reset password</h4>

                {/* message */}
                {success && <>
                    <SuccessMessage message={success} className='mt-4 mb-6 text-md' /> <Link href={WEB_ROUTES.LOGIN}>Please signin</Link>
                </>}
                <ErrorMessage message={error} className='text-sm mt-2 mb-6' />

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