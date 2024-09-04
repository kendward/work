import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import SheetLayout from '../../layout/sheet-layout'

function BillingForm() {
    return (
        <SheetLayout>
            <form>
                <h3 className='font-bold text-lg mb-4'>Brand New plan</h3>
                <div className="flex gap-4 flex-wrap">
                    <p className='text-md font-medium'>Plan description:</p>
                    <p className='text-md font-medium'>
                        Unlock all features<br />More collaborators<br />SSO available<br />
                        and more</p>
                </div>

                <div className="flex items-start gap-4 mt-16 flex-wrap">
                    <p className='text-md font-medium'>Choose payment:</p>
                    <div className="flex flex-col gap-6">
                        <RadioGroup defaultValue="comfortable" className=' flex items-center gap-8 md:gap-16'>
                            <div className="flex items-center space-x-2 cursor-pointer">
                                <RadioGroupItem className='w-6 h-6' value="comfortable" id="r2" />
                                <Label className='font-normal  cursor-pointer text-md' htmlFor="r2">Yearly</Label>
                            </div>
                            <div className="flex items-center space-x-2 cursor-pointer">
                                <RadioGroupItem className='w-6 h-6' value="compact" id="r3" />
                                <Label className='font-normal  cursor-pointer text-md' htmlFor="r3">Monthly</Label>
                            </div>
                        </RadioGroup>
                        <h2 className='font-medium text-3xl'>$ 119 / year</h2>
                        <div className="mt-8">
                            <div className="flex items-start space-x-2">
                                <Checkbox id="terms" className='w-[27px] h-[27px] rounded-sm' />
                                <label
                                    htmlFor="terms"
                                    className="text-md font-normal leading-6 -mt-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    By checking this box, you agree to the<br /> <Link className='underline underline-offset-1' href={""}>Terms Of Service</Link> and <Link className='underline underline-offset-1' href={""}>SaaS Agreement</Link>.
                                </label>
                            </div>
                        </div>
                        <Button variant='default' className='mt-12 mx-auto'>Update</Button>
                    </div>
                </div>
            </form>
        </SheetLayout>
    )
}

export default BillingForm