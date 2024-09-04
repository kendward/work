import React from 'react'
import { Button } from '@/components/ui/button'
import { useLayoutActions } from '@/hooks/actions/useLayoutAction'
import SheetLayout from '../../layout/sheet-layout'

function DeleteProjectForm() {
    const { toggleSheet } = useLayoutActions()
    return (
        <SheetLayout>
            <h3 className='font-bold text-lg mb-4'>Do you want to delete &quot;Corbins&quot;?</h3>
            <p className='text-md font-medium'>Deleting this brand will also delete it for all editors and viewers<br />who have been invited. This action is permanent.</p>

            <div className="flex items-center gap-2 mt-12">
                <Button variant='destructive'>Delete</Button>
                <Button variant='ghost' onClick={(e) => {
                    toggleSheet(false)
                }}>Cancel</Button>
            </div>
        </SheetLayout>
    )
}

export default DeleteProjectForm