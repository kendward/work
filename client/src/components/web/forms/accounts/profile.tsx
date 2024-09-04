"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCurrentUser } from '@/hooks/use-current-user'
import Image from 'next/image'
import React from 'react'
import { useLayoutActions } from '@/hooks/actions/useLayoutAction'
import SheetLayout from '../../layout/sheet-layout'

function ProfileForm(): JSX.Element {
  const user = useCurrentUser()
  const { toggleSheet } = useLayoutActions()
  return (
    <SheetLayout>
      <form>
        <div className="flex gap-16 flex-wrap justify-center">
          <div className="flex flex-col gap-2">
            <Image src="/images/coloured-profile.png" width={125} height={125} alt='profile' />
            <Button variant="secondary" className='border-2 border-[#DAE1EC] bg-transparent shadow-none'>Browse</Button>
          </div>

          <div className="flex-grow flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <Label>Name</Label>
              <Input value={user?.name} type='text' name='name' />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Email</Label>
              <Input value={user?.email} type='text' name='name' />
            </div>
            <div className="flex gap-1">
              <Button>Update</Button>
              <Button variant={"ghost"} onClick={(e) => {
                e.preventDefault()
                toggleSheet(false)
              }}>Cancel</Button>
            </div>
          </div>
        </div>

      </form>
    </SheetLayout>
  )
}

export default ProfileForm