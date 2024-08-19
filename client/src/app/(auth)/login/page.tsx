"use client";
import { login, verifyEmail } from '@/actions/auth';
import Button from '@/components/web/common/button'
import Input from '@/components/web/common/Input'
import { WEB_ROUTES } from '@/constants/pages-routes';
import useToaster from '@/hooks/useToaster';
import { cn } from '@/utils';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState, useTransition } from 'react'

function LoginPage() {

    // use state hooks
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPasswordField, setShowPasswordField] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    // other hooks
    const [isPending, startTransition] = useTransition();


    // custom hooks
    const { showError, showSuccess } = useToaster()


    /**
     * handle form submission for login
     * @param e  form event
     * @returns  void
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!formData.email) {
            showError('Please enter your email address')
            return
        }

        if (!showPasswordField) {
            startTransition(() => verifyEmail({ email: formData.email }).then((res) => {
                if (res.error) return showError(res.message as string)
                setMessage("Enter password for " + formData.email)
                setShowPasswordField(true)
            }).catch((err) => {
                showError(err.message)
            }));
            return
        } else {
            if (!formData.password) {
                showError('Please enter your password')
                return
            }
            startTransition(() => login(formData, WEB_ROUTES.HOME).then((res) => {
                if (res.error) return setError(res.message as string)
                showSuccess('Login successfully');
                setError('')
                setTimeout(() => {
                    window.location.href = WEB_ROUTES.HOME
                }, 2000)
            }).catch((err) => {
                showError(err.message)
            }));
        }

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

            {/* Login Form */}
            <form action="" className='w-full md:w-1/2 lg:w-[400px] p-2 lg:p-8 flex flex-col items-center mb-10 md:mb-28 text-center' onSubmit={handleSubmit}>

                {/* logo */}
                <Image src='/images/logo.png' width={72.4} height={72.4} alt='logo' className='mb-16' />

                {/* heading */}
                <h4 className='text-2xl font-medium text-center my-4 text-clr-dark-primary'>Sign in Klayd</h4>

                {/* message */}
                {message && <p className='text-lg my-2 text-clr-dark-primary'>{message}</p>}
                {error && <p className='text-md my-3 text-red-600'>{error}</p>}

                {/* error message */}
                {/* email input */}
                {!showPasswordField && <Input name='email' type='text' placeholder='E-mail Address' value={formData.email} onChange={handleChange} className='my-2' disabled={isPending} />
                }

                {showPasswordField && <>
                    {/* password input */}
                    <Input name='password' type='password' placeholder='Password' value={formData.password} onChange={handleChange} className='my-2' disabled={isPending} />

                    {/* forget password link */}
                    <div className='text-right w-full my-2'>
                        <Link href='/forgot-password' className='text-clr-dark-primary text-md font-semibold'>Forgot Password?</Link>
                    </div>
                </>}

                {/* submit button */}
                <Button type='submit' className={cn("mt-2", isPending ? "bg-blue-800" : "")} disabled={isPending}>{isPending && showPasswordField ? "Signing in" : "Continue"}</Button>

                {showPasswordField ?
                    <p className='text-md mt-10 font-semibold cursor-pointer' onClick={() => {
                        setShowPasswordField(false)
                        setMessage('')
                        setError('')
                    }}>Change User</p>
                    : <p className='text-md mt-10 font-semibold'>New User? <Link href='/register' className='text-clr-blue-primary'>Create an Account</Link></p>}
            </form>
        </div>
    )
}

export default LoginPage