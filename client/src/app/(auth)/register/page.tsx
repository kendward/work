"use client";
import Button from '@/components/web/common/button'
import Checkbox from '@/components/web/common/checkbox';
import Input from '@/components/web/common/Input'
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

function RegisterPage() {

  // manage form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
          <Checkbox label={<span className='font-semibold'>
            I&apos;ve read and agree to the <Link href='/terms' className='text-clr-blue-primary'>Terms of Service</Link> and <Link href='/privacy' className='text-clr-blue-primary'>Privacy Policy</Link>
          </span>} checked={false} onChange={handleChange} className='text-left text-md text-black' />
          <Checkbox label="Keep me updated on news from Klayd" checked={false} onChange={handleChange} className='text-left text-md text-black font-semibold' />
        </div>


        <Button type='submit' className='mt-2 '>Register</Button>

        {/* already have an account */}
        <p className='text-md mt-6 font-semibold'>Already have an Klayd account? <Link href='/login' className='text-clr-blue-primary'>Sign in</Link></p>
      </form>
    </div>
  )
}

export default RegisterPage