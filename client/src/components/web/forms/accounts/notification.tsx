import React from 'react'
import { Label } from '@/components/ui/label'
import ToggleSwitch from '../../common/toggle-switch'
import { Button } from '@/components/ui/button'
import { useLayoutActions } from '@/hooks/actions/useLayoutAction'
import SheetLayout from '../../layout/sheet-layout'

function NotificationForm() {
    const { toggleSheet } = useLayoutActions()
    return (
        <SheetLayout classNames='max-w-[350px] w-full'>
            <h3 className='font-bold text-lg text-black'>Manage your notifications</h3>
            <div className="mt-12">
                <Label className='text-md font-normal'>Klayd Updates</Label>
                <span className='text-clr-light-gray text-md block mt-2'>Be first to know about all new features</span>
                <br />
                <ToggleSwitch hideLabel />

                <div className="flex justify-end mt-8 pe-0 md:pe-10">
                    <Button variant={"ghost"} onClick={() => toggleSheet(false)}>Close</Button>
                </div>
            </div>
        </SheetLayout>
    )
}

export default NotificationForm