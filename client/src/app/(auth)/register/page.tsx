"use client";
import { registerAction } from '@/actions/auth';
import Button from '@/components/web/common/button'
import Checkbox from '@/components/web/common/checkbox';
import Input from '@/components/web/common/Input'
import { WEB_ROUTES } from '@/constants/pages-routes';
import { RegisterFormValues, RegisterSchema } from '@/schema/auth';
import { cn } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import InputMessageBox from '@/components/web/common/input-message-box';
import SuccessMessage from '@/components/web/common/SuccessMessage';
import ErrorMessage from '@/components/web/common/ErrorMessage';
import useMessage from '@/hooks/useMessage';

function RegisterPage() {

  // use state hooks
  const [formData, setFormData] = useState({
    acceptPolicy: false,
    keepMeUpdated: false
  })

  // other hooks
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  // custom hooks
  const { error, success, setErrorMessage, setSuccessMessage, clearMessages } = useMessage();




  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>(
    { resolver: zodResolver(RegisterSchema) });


  /**
   * handle form submission for registration
   * @param e  form event
   * @returns  void
   */
  const onSubmit = async (data: RegisterFormValues) => {

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(data.password)) {
      return setErrorMessage('Password must contain at least one uppercase letter, one lowercase letter and one number')
    }

    startTransition(() => registerAction(data).then((res) => {
      if (res.error) return setErrorMessage(res.message as string)
      setSuccessMessage(res.message as string);
      setTimeout(() => {
        router.push(`${WEB_ROUTES.LOGIN}?success=Please check your email to verify your account`)
      }, 2000)
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
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    })
  }

  return (
    <div className='flex-1 flex justify-center items-center w-full h-full'>

      {/* Register Form */}
      <form className='w-full md:w-1/2 lg:w-[400px] p-2 lg:p-8 flex flex-col items-center mb-10 text-center' onSubmit={handleSubmit(onSubmit)}>

        {/* logo */}
        <Image src='/images/svg/klayd-logo-circle.svg' width={72.4} height={72.4} alt='logo' className='mb-5' />

        {/* heading */}
        <h4 className='text-2xl font-medium text-center my-4 text-clr-dark-primary'>Create an Account</h4>

        {/* Messages */}
        <SuccessMessage message={success} className='mt-2 mb-6 text-xl' />
        <ErrorMessage message={error} className='text-sm mt-2 mb-6' />

        {/* name field */}
        <div className="relative w-full">
          <Input type='text' name="name" placeholder='Your Name' onChange={handleChange} className='my-2' register={register} />
          {errors.name && <div className='mb-5'><InputMessageBox message={errors.name.message} /></div>}
        </div>
        <div className="relative w-full">
          <Input type='email' name="email" placeholder='E-mail Address' onChange={handleChange} className='my-2' register={register} />
          {errors.email && <div className='mb-5'><InputMessageBox message={errors.email.message} /></div>}
        </div>
        {/* password field */}
        <div className="relative w-full">
          <Input type='password' name='password' placeholder='Password' onChange={handleChange} className='my-2' register={register} />
          {errors.password && <div className='mb-5'><InputMessageBox message={errors.password.message} /></div>}
        </div>
        {/* confirm password field */}
        <div className="relative w-full">
          <Input type='password' name='confirmPassword' placeholder='Confirm Password' onChange={handleChange} className='my-2' register={register} />
          {errors.confirmPassword && <div className='mb-5'><InputMessageBox message={errors.confirmPassword.message} /></div>}
        </div>


        {/* terms and conditions */}
        <div className="my-6 flex flex-col gap-3">
          <Checkbox name="acceptPolicy" label={<span className='font-semibold'>
            I&apos;ve read and agree to the <Link href='/terms' className='text-clr-blue-primary'>Terms of Service</Link> and <Link href='/privacy' className='text-clr-blue-primary'>Privacy Policy</Link>
          </span>} checked={formData.acceptPolicy} onChange={handleChange} className='text-left text-md text-black' />


          <Checkbox name="keepMeUpdated" label="Keep me updated on news from Klayd" checked={formData.keepMeUpdated} onChange={handleChange} className='text-left text-md text-black font-semibold' />
        </div>

        <Button type='submit' className={cn("mt-2", isPending ? "bg-blue-800" : "")} disabled={isPending || !formData.acceptPolicy}>Register</Button>

        {/* already have an account */}
        <p className='text-sm mt-10 font-medium'>Already have an Klayd account? <Link href='/login' className='text-clr-blue-primary'>Sign in</Link></p>
      </form>
    </div>
  )
}

export default RegisterPage