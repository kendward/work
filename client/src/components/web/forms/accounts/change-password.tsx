import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'
import { useLayoutActions } from '@/hooks/actions/useLayoutAction'
import SheetLayout from '../../layout/sheet-layout'

function ChangePasswordForm() {
    const { toggleSheet } = useLayoutActions()
    return (
        <SheetLayout classNames='max-w-md'>
            <form>
                <p className='text-black text-md font-normal mb-8 md:mb-12'>
                    Password must contain at least 1 lowercase <br />and 1 uppercase letter, and 1 numeric character.
                </p>

                <div className="flex-grow flex flex-col gap-8">
                    <div className="flex flex-col gap-1">
                        <Label>Current password</Label>
                        <Input type='password' name='password' />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>New password</Label>
                        <Input type='password' name='newPassword' />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Confirm New password</Label>
                        <Input type='password' name='newPassword' />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Link href={"/forgot-password"} className='text-[#2655F5] text-sm'>Forgot Password</Link>
                    </div>
                    <div className="flex gap-2">
                        <Button>Update</Button>
                        <Button variant={"ghost"} onClick={(e) => {
                            e.preventDefault()
                            toggleSheet(false)
                        }}>Cancel</Button>
                    </div>
                </div>
            </form>
        </SheetLayout>
    )
}

export default ChangePasswordForm