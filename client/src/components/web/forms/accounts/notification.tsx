import React from 'react'
import { Label } from '@/components/ui/label'
import ToggleSwitch from '../../common/toggle-switch'
import { Button } from '@/components/ui/button'
import { useLayoutActions } from '@/hooks/actions/useLayoutAction'
import SheetLayout from '../../layout/sheet-layout'
import useMessage from '@/hooks/useMessage'
import UserService from '@/services/user.service'
import SuccessMessage from '../../common/SuccessMessage'
import ErrorMessage from '../../common/ErrorMessage'
import { useUser } from '@/store/hooks'
import { useUserActions } from '@/hooks/actions/useUserAction'

function NotificationForm() {
    const { toggleSheet } = useLayoutActions()
    const { user } = useUser()
    const { updateCurrentUserState } = useUserActions()
    const { setSuccessMessage, setErrorMessage, clearMessages, error, success } = useMessage()

    const updateNotificationStatus = async (e: any) => {
        try {
            const response = await UserService.receiveNotifications(e.target.checked)
            if (response?.data?.statusCode === 200) {
                updateCurrentUserState({ ...user, receiveUpdates: !user.receiveUpdates })
                setSuccessMessage('Notification status updated successfully')
            }
        } catch (error) {
            console.log(error)
            setErrorMessage('Failed to update notification status')
        }
        finally {
            setTimeout(() => {
                clearMessages()
            }, 3000)
        }
    }
    return (
        <SheetLayout classNames='max-w-[350px] w-full'>
            <h3 className='font-bold text-lg text-black'>Manage your notifications</h3>
            <div className="mt-12">
                <Label className='text-md font-normal'>Klayd Updates</Label>
                <span className='text-clr-light-gray text-md block mt-2'>Be first to know about all new features</span>
                <br />
                <ToggleSwitch hideLabel isOn={user.receiveUpdates} onChange={updateNotificationStatus} />
                <SuccessMessage message={success} className='text-left' />
                <ErrorMessage message={error} className='text-left' />
                <div className="flex justify-end mt-8 pe-0 md:pe-10">
                    <Button variant={"ghost"} onClick={() => toggleSheet(false)}>Close</Button>
                </div>
            </div>
        </SheetLayout>
    )
}

export default NotificationForm