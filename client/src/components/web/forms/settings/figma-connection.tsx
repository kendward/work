import React from 'react'
import SheetLayout from '../../layout/sheet-layout'
import { Button } from '@/components/ui/button'
import { useLayoutActions } from '@/hooks/actions/useLayoutAction'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import ToggleSwitch from '../../common/toggle-switch'

function FigmaConnectionForm() {
    const { toggleSheet } = useLayoutActions()
    return (
        <SheetLayout classNames='max-w-2xl'>
            <h3 className='font-bold text-lg mb-4'>Figma URL</h3>
            <p className='text-md font-medium'>Connect a Figma file and import your UI Kit data.<br />Any future edits or additions to this file can be imported automatically</p>

            <div className="flex flex-col gap-2 mt-10">
                <Label className='text-md font-bold'>Figma URL</Label>
                <Input type='text' placeholder='https://figma.com/file/...' />

                <div className="flex justify-between items-center mt-4">
                    <p className='text-md font-medium'>Import tokens from this file</p>
                    <ToggleSwitch />
                </div>
            </div>

            <div className="flex items-center gap-2 mt-10">
                <Button>Update</Button>
                <Button variant='ghost' onClick={(e) => {
                    toggleSheet(false)
                }}>Cancel</Button>
            </div>
        </SheetLayout>
    )
}

export default FigmaConnectionForm