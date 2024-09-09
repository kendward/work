import React from 'react'
import { Button } from '@/components/ui/button'
import { useLayoutActions } from '@/hooks/actions/useLayoutAction'
import SheetLayout from '../../layout/sheet-layout'
import useMessage from '@/hooks/useMessage'
import ShowMessage from '../../common/ShowMessage'
import { ApiResponse } from '../../../../../types/common'
import useApi from '@/hooks/useApi'
import { API_ROUTES } from '@/constants/api-routes'

function DeleteAccountForm() {
    const { toggleSheet } = useLayoutActions()
    const { setSuccessMessage, setErrorMessage, clearMessages, error, success } = useMessage()

    const { post: deleteAccountFn } = useApi<ApiResponse>({
        key: [API_ROUTES.ORGANIZATION.DELETE_ACCOUNT],
        method: "POST",
        url: API_ROUTES.ORGANIZATION.DELETE_ACCOUNT,
    });
    const deleteAccount = async () => {
        try {
            const confirm = window.confirm('Are you sure you want to delete your account?')
            if (!confirm) return
            const password = window.prompt('Enter your password to delete your account')
            if (!password) return
            const response = await deleteAccountFn?.mutateAsync({ password });
            if (response?.statusCode === 200) {
                setSuccessMessage('Account deleted successfully. Redirecting to login page...')
                setTimeout(() => {
                    window.location.href = '/logout'
                }, 3000)
            }
        } catch (error: any) {
            console.log(error)
            setErrorMessage(`Failed to delete account. ${error?.response?.data?.message || ''}` || 'Failed to delete account')
        }
        finally {
            setTimeout(() => {
                clearMessages()
            }, 3000)
        }
    }

    return (
        <SheetLayout>
            <h3 className='font-bold text-lg mb-4'>Do you want to delete your account?</h3>
            <p className='text-md font-medium'>Deleting this brand will also delete it for all editors and viewers<br />who have been invited. This action is permanent.</p>

            <div className="flex items-center gap-2 mt-12">

                <Button disabled={deleteAccountFn?.isPending} variant='destructive' onClick={deleteAccount}>Delete</Button>
                <Button disabled={deleteAccountFn?.isPending} variant='ghost' onClick={(e) => {
                    toggleSheet(false)
                }}>Cancel</Button>
            </div>
            <div className="mt-4">
                <ShowMessage error={error} success={success} className='text-left my-0' />
            </div>
        </SheetLayout>
    )
}

export default DeleteAccountForm