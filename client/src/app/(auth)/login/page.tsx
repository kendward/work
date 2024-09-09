"use client";
import { login, verifyEmail } from '@/actions/auth';
import Button from '@/components/web/common/button'
import ErrorMessage from '@/components/web/common/ErrorMessage';
import Input from '@/components/web/common/Input'
import SuccessMessage from '@/components/web/common/SuccessMessage';
import { WEB_ROUTES } from '@/constants/pages-routes';
import useMessage from '@/hooks/useMessage';
import { cn } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react'

function LoginPage() {

    // use state hooks
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPasswordField, setShowPasswordField] = useState(false)

    // other hooks
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams()
    const router = useRouter()

    // custom hooks
    const { error, success, setErrorMessage, setSuccessMessage, clearMessages } = useMessage();



    useEffect(() => {
        if (searchParams.get('success')) {
            setSuccessMessage(searchParams.get('success') as string)
            // reset search params
            router.replace(WEB_ROUTES.LOGIN)
        }
        if (searchParams.get('error')) {
            setErrorMessage(searchParams.get('error') as string)
            router.replace(WEB_ROUTES.LOGIN)
        }
    }, [searchParams])

    /**
     * handle form submission for login
     * @param e  form event
     * @returns  void
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!formData.email) {
            setErrorMessage('Please enter your email address')
            return
        }

        if (!showPasswordField) {
            startTransition(() => verifyEmail({ email: formData.email }).then((res) => {
                if (res.error) {
                    setErrorMessage(res.message as string)
                    setTimeout(() => {
                        router.replace(WEB_ROUTES.REGISTER)
                    }, 2000)
                    return
                }
                setShowPasswordField(true)
            }).catch((err) => {
                setErrorMessage(err.message)
            }));
            return
        } else {
            if (!formData.password) {
                setErrorMessage('Please enter your password')
                return
            }
            startTransition(() => login(formData, WEB_ROUTES.HOME).then((res) => {
                if (res.error) return setErrorMessage(res.message as string)
                setSuccessMessage('Login successfully');
                setTimeout(() => {
                    window.location.href = WEB_ROUTES.HOME
                }, 2000)
            }).catch((err) => {
                setErrorMessage(err.message)
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
                <Image src='/images/svg/klayd-logo-circle.svg' width={72.4} height={72.4} alt='logo' className='mb-16' />

                {/* heading */}
                {!showPasswordField && <h4 className='text-2xl font-medium text-center my-4 text-clr-dark-primary'>Sign in Klayd</h4>}

                {/* message */}
                {showPasswordField && <p className='text-[#282828] font-normal text-2xl leading[36px] text-center mb-8'>Enter password for <br />{formData.email} </p>}
                <SuccessMessage message={success} className='mt-2 mb-6 text-xl' />
                <ErrorMessage message={error} className='text-sm mt-2 mb-6' />

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
                        clearMessages()
                    }}>Change User</p>
                    : <p className='text-sm mt-10 font-medium'>New User? <Link href='/register' className='text-clr-blue-primary'>Create an Account</Link></p>}
            </form>
        </div>
    )
}

export default LoginPage