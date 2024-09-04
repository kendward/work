import React from 'react'
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
import SheetLayout from '../../layout/sheet-layout'

function BillingInformation() {
    return (
        <SheetLayout classNames='max-w-2xl mx-auto'>
            <form>
                <h3 className='font-bold text-lg mb-8'>Billing Information</h3>
                <div className="flex-grow flex flex-col gap-8">
                    <div className="flex flex-col gap-1">
                        <Label>Name</Label>
                        <Input type='text' name='name' placeholder='Enter the name of business or representative' />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Billing Address</Label>
                        <Input type='text' name='bullingAddress' placeholder='Enter the address odf the company or representative' />
                    </div>

                    <div className="flex gap-8 md:gap-10 flex-wrap md:flex-nowrap">
                        <div className="flex flex-col gap-1 w-full md:w-1/2">
                            <Label>Country</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {getData().map((country) => (
                                            <SelectItem key={country.code} value={country.code}>
                                                {country.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-1 w-full md:w-1/2">
                            <Label>Zip</Label>
                            <Input type='text' name='zip' placeholder='Enter Zip' />
                        </div>
                    </div>
                    <div className="flex gap-8 md:gap-10 flex-wrap md:flex-nowrap">
                        <div className="flex flex-col gap-1 w-full md:w-1/2">
                            <Label>Tax registration number</Label>
                            <Input type='text' name='taxRegistrationNumber' placeholder='Enter VAT number, if applicable' />
                        </div>
                        <div className="flex flex-col gap-1 w-full md:w-1/2">
                            <Label>VAT Country</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {getData().map((country) => (
                                            <SelectItem key={country.code} value={country.code}>
                                                {country.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <Button>Update</Button>
                        <Button variant={"ghost"}>Cancel</Button>
                    </div>
                </div>
            </form>
        </SheetLayout>
    )
}

export default BillingInformation