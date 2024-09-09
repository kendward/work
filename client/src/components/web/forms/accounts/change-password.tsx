import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useLayoutActions } from '@/hooks/actions/useLayoutAction'
import SheetLayout from '../../layout/sheet-layout'
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ChangePasswordSchema, ChangePasswordFormValues } from '@/schema/user'
import useMessage from '@/hooks/useMessage'
import ShowMessage from '../../common/ShowMessage'
import useApi from '@/hooks/useApi'
import { API_ROUTES } from '@/constants/api-routes'
import { ApiResponse } from '../../../../../types/common'

function ChangePasswordForm() {
    const { toggleSheet } = useLayoutActions()

    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })
    const { setSuccessMessage, setErrorMessage, clearMessages, error, success } = useMessage()


    const { post: changePasswordFn } = useApi<ApiResponse>({
        key: [API_ROUTES.USER.CHANGE_PASSWORD],
        method: "POST",
        url: API_ROUTES.USER.CHANGE_PASSWORD,
    });

    const onSubmit = async (data: ChangePasswordFormValues) => {
        try {
            const response = await changePasswordFn?.mutateAsync(data);
            if (response?.statusCode === 200) {
                setSuccessMessage('Password updated successfully')
                form.reset()
            }
        }
        catch (error: any) {
            console.log(error?.response?.data)
            setErrorMessage(error?.response?.data?.message || 'Failed to update password')
        }
        finally {
            setTimeout(() => {
                clearMessages()
            }, 3000)
        }
    }

    return (
        <SheetLayout classNames='max-w-md'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <p className='text-black text-md font-normal mb-8 md:mb-12'>
                        Password must contain at least 1 lowercase <br />and 1 uppercase letter, and 1 numeric character.
                    </p>

                    <div className="flex-grow flex flex-col gap-8">
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-col gap-1">
                                        <Label>Current password</Label>
                                        <Input type='password' {...field} />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-col gap-1">
                                        <Label>New password</Label>
                                        <Input type='password' {...field} />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-col gap-1">
                                        <Label>Confirm New password</Label>
                                        <Input type='password' {...field} />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <ShowMessage error={error} success={success} className='text-left my-0' />
                        <div className="flex gap-2">
                            <Button> disabled={changePasswordFn?.isPending} Update</Button>
                            <Button disabled={changePasswordFn?.isPending} variant={"ghost"} onClick={(e) => {
                                e.preventDefault()
                                toggleSheet(false)
                            }}>Cancel</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </SheetLayout>
    )
}

export default ChangePasswordForm