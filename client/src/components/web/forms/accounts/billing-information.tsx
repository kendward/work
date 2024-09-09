import React, { useEffect, useMemo, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getData } from "country-list"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import SheetLayout from '../../layout/sheet-layout'
import { UpdateBillingInformationFormValues, UpdateBillingInformationSchema } from '@/schema/organization'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useApi from '@/hooks/useApi'
import { ApiResponse } from '../../../../../types/common'
import useMessage from '@/hooks/useMessage'
import { API_ROUTES } from '@/constants/api-routes'
import ShowMessage from '../../common/ShowMessage'
import { useUser } from '@/store/hooks'
import { useUserActions } from '@/hooks/actions/useUserAction'

function BillingInformation() {

    const [countries, setCountries] = useState<{
        code: string;
        name: string;
    }[]>([])

    useEffect(() => {
        setCountries(getData())
    }, [])

    const { user } = useUser()
    const { updateCurrentUserState } = useUserActions()
    const form = useForm<UpdateBillingInformationFormValues>({
        resolver: zodResolver(UpdateBillingInformationSchema),
        defaultValues: user.organization.billingInformation || {
            name: '',
            address: '',
            country: '',
            zipCode: '',
            vatNumber: '',
            vatCountry: '',
        }
    })

    useEffect(() => {
        if (user.organization.billingInformation) {
            form.reset(user.organization.billingInformation)
        }
    }, [user.organization.billingInformation, form])

    const { setSuccessMessage, setErrorMessage, clearMessages, error, success } = useMessage()

    const { post: updateBillingFn } = useApi<ApiResponse>({
        key: [API_ROUTES.ORGANIZATION.SAVE_BILLING_INFO],
        method: "POST",
        url: API_ROUTES.ORGANIZATION.SAVE_BILLING_INFO,
    });

    const onSubmit = async (data: UpdateBillingInformationFormValues) => {
        try {
            const response = await updateBillingFn?.mutateAsync(data);
            if (response?.statusCode === 200) {
                setSuccessMessage('Billing information updated successfully')
                updateCurrentUserState({
                    ...user,
                    organization: {
                        ...user.organization,
                        billingInformation: data
                    }
                })
            }
        }
        catch (error: any) {
            console.log(error?.response?.data)
            setErrorMessage(error?.response?.data?.message || 'Failed to update billing information')
        }
        finally {
            setTimeout(() => {
                clearMessages()
            }, 3000)
        }
    }

    return (
        <SheetLayout classNames='max-w-2xl mx-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <h3 className='font-bold text-lg mb-8'>Billing Information</h3>
                    <div className="flex-grow flex flex-col gap-8">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-col gap-1">
                                        <Label>Name</Label>
                                        <Input type='text' {...field} placeholder='Enter the name of business or representative' />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-col gap-1">
                                        <Label>Billing Address</Label>
                                        <Input type='text' {...field} placeholder='Enter the address odf the company or representative' />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-8 md:gap-10 flex-wrap md:flex-nowrap">
                            <div className="flex flex-col gap-1 w-full md:w-1/2">
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Country</Label>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Choose country" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {countries.map((country) => (
                                                            <SelectItem key={country.code} value={country.code}>
                                                                {country.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full md:w-1/2">
                                <FormField
                                    control={form.control}
                                    name="zipCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Zip</Label>
                                            <Input type='text' {...field} placeholder='Enter Zip' />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex gap-8 md:gap-10 flex-wrap md:flex-nowrap">
                            <div className="flex flex-col gap-1 w-full md:w-1/2">
                                <FormField
                                    control={form.control}
                                    name="vatNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Tax registration number</Label>
                                            <Input type='text' {...field} placeholder='Enter VAT number, if applicable' />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full md:w-1/2">
                                <FormField
                                    control={form.control}
                                    name="vatCountry"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>VAT Country</Label>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Choose country" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {countries.map((country) => (
                                                            <SelectItem key={country.code} value={country.code}>
                                                                {country.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <ShowMessage error={error} success={success} className='mb-0' />

                        <div className="flex items-center justify-center gap-3 mt-6">
                            <Button disabled={updateBillingFn?.isPending}>Update</Button>
                            <Button disabled={updateBillingFn?.isPending} variant={"ghost"}>Cancel</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </SheetLayout>
    )
}

export default BillingInformation