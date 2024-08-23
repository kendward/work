"use client";
import { register } from '@/actions/auth';
import Button from '@/components/web/common/button'
import Checkbox from '@/components/web/common/checkbox';
import Input from '@/components/web/common/Input'
import { WEB_ROUTES } from '@/constants/pages-routes';
import useToaster from '@/hooks/useToaster';
import AuthService from '@/services/auth.service';
import { cn } from '@/utils';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react'

function RegisterPage() {

  // use state hooks
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptPolicy: false,
    keepMeUpdated: false
  })

  // other hooks
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  // custom hooks
  const { showSuccess, showError } = useToaster()

  /**
   * handle form submission for registration
   * @param e  form event
   * @returns  void
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      showError('Passwords do not match')
      return
    }

    startTransition(() => register(formData).then((res) => {
      if (res.error) return showError(res.message as string)
      showSuccess(res.message as string);
      setTimeout(() => {
        router.push(`${WEB_ROUTES.LOGIN}?success=Please check your email to verify your account`)
      }, 2000)
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
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    })
  }

  return (
    <div className='flex-1 flex justify-center items-center w-full h-full'>

      {/* Register Form */}
      <form className='w-full md:w-1/2 lg:w-[400px] p-2 lg:p-8 flex flex-col items-center mb-10 text-center' onSubmit={handleSubmit}>

        {/* logo */}
        <Image src='/images/logo.png' width={72.4} height={72.4} alt='logo' className='mb-6' />

        {/* heading */}
        <h4 className='text-2xl font-medium text-center my-4 text-clr-dark-primary'>Create an Account</h4>

        {/* name field */}
        <Input type='text' name="name" placeholder='Your Name' value={formData.name} onChange={handleChange} className='my-2' />

        <Input type='text' name="email" placeholder='E-mail Address' value={formData.email} onChange={handleChange} className='my-2' />

        {/* password field */}
        <Input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} className='my-2' />

        {/* confirm password field */}
        <Input type='password' name='confirmPassword' placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} className='my-2' />


        {/* terms and conditions */}
        <div className="my-6 flex flex-col gap-3">
          <Checkbox name="acceptPolicy" label={<span className='font-semibold'>
            I&apos;ve read and agree to the <Link href='/terms' className='text-clr-blue-primary'>Terms of Service</Link> and <Link href='/privacy' className='text-clr-blue-primary'>Privacy Policy</Link>
          </span>} checked={formData.acceptPolicy} onChange={handleChange} className='text-left text-md text-black' />


          <Checkbox name="keepMeUpdated" label="Keep me updated on news from Klayd" checked={formData.keepMeUpdated} onChange={handleChange} className='text-left text-md text-black font-semibold' />
        </div>

        <Button type='submit' className={cn("mt-2", isPending ? "bg-blue-800" : "")} disabled={isPending || !formData.acceptPolicy}>Register</Button>

        {/* already have an account */}
        <p className='text-md mt-6 font-semibold'>Already have an Klayd account? <Link href='/login' className='text-clr-blue-primary'>Sign in</Link></p>
      </form>
    </div>
  )
}

export default RegisterPage