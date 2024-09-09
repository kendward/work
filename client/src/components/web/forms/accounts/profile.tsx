"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCurrentUser } from '@/hooks/use-current-user'
import Image from 'next/image'
import React, { useMemo } from 'react'
import { useLayoutActions } from '@/hooks/actions/useLayoutAction'
import SheetLayout from '../../layout/sheet-layout'
import { ApiResponse } from '../../../../../types/common'
import useApi from '@/hooks/useApi'
import { API_ROUTES } from '@/constants/api-routes'
import useMessage from '@/hooks/useMessage'
import { UpdateProfileFormValues, UpdateProfileSchema } from '@/schema/user'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ShowMessage from '../../common/ShowMessage'
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { useSession } from 'next-auth/react'

function ProfileForm(): JSX.Element {
  const user = useCurrentUser()
  const { update } = useSession()
  const { toggleSheet } = useLayoutActions()


  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: useMemo(() => {
      return {
        name: user?.name || '',
        email: user?.email || '',
      }
    }, [user?.name, user?.email]),
  })

  const { setSuccessMessage, setErrorMessage, clearMessages, error, success } = useMessage()

  const { post: updateProfile } = useApi<ApiResponse>({
    key: [API_ROUTES.USER.UPDATE_PROFILE],
    method: "POST",
    url: API_ROUTES.USER.UPDATE_PROFILE,
  });

  const onSubmit = async (data: UpdateProfileFormValues) => {
    try {
      const response = await updateProfile?.mutateAsync(data);
      if (response?.statusCode === 200) {
        setSuccessMessage('Profile updated successfully')
        update(
          {
            name: data.name,
            email: data.email,
          },
        )
      }
    }
    catch (error: any) {
      console.log(error?.response?.data)
      setErrorMessage(error?.response?.data?.message || 'Failed to update profile')
    }
    finally {
      setTimeout(() => {
        clearMessages()
      }, 3000)
    }
  }

  return (
    <SheetLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-16 flex-wrap justify-center">
            <div className="flex flex-col gap-2">
              <Image src="/images/coloured-profile.png" width={125} height={125} alt='profile' />
              <Button variant="secondary" className='border-2 border-[#DAE1EC] bg-transparent shadow-none'>Browse</Button>
            </div>

            <div className="flex-grow flex flex-col gap-8">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-1">
                      <Label>Name</Label>
                      <Input type='text' {...field} />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-1">
                      <Label>Email</Label>
                      <Input type='email' {...field} />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ShowMessage error={error} success={success} className='text-left my-0' />

              <div className="flex gap-1">
                <Button disabled={updateProfile?.isPending}>Update</Button>
                <Button disabled={updateProfile?.isPending} variant={"ghost"} onClick={(e) => {
                  e.preventDefault()
                  toggleSheet(false)
                }}>Cancel</Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </SheetLayout>
  )
}

export default ProfileForm