import React from 'react'
import SheetLayout from '../../layout/sheet-layout'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useLayoutActions } from '@/hooks/actions/useLayoutAction'

function RepositoryConnection() {
    const { toggleSheet } = useLayoutActions()
    return (
        <SheetLayout>
            <h3 className='font-bold text-lg mb-4'>Sync providers credentials</h3>
            <p className='text-md font-medium'>Access UI components on your repository, push and pull in two-way sync.</p>

            <form action="">
                <div className="flex flex-col gap-10 mt-10">
                    <div className="flex gap-8 md:gap-10 flex-wrap md:flex-nowrap">
                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <Label>Sync providers</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Add new" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value='github'>
                                            Github
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <Label>Personal Access Token</Label>
                            <Input type='text' name='accessToken' placeholder='Enter personal access token' />
                        </div>
                    </div>
                    <div className="flex gap-8 md:gap-10 flex-wrap md:flex-nowrap">
                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <Label>Organization Url</Label>
                            <Input type='text' name='organizationUrl' placeholder='https://dev.azure.com/yourOrgName' />
                        </div>
                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <Label>Branch</Label>
                            <Input type='text' name='branch' placeholder='.' />
                        </div>
                    </div>
                    <div className="flex gap-8 md:gap-10 flex-wrap md:flex-nowrap">
                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <Label>Repository name</Label>
                            <Input type='text' name='organizationUrl' placeholder='Enter repository name' />
                        </div>
                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <Label>Project Name (optional)</Label>
                            <Input type='text' name='branch' placeholder='Enter project name' />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <Label>File Path (e.g. tokens.json) or folder path (e.g. Token)</Label>
                        <Input type='text' name='branch' placeholder='Enter VAT number, if applicable' />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button>Update</Button>
                        <Button variant='ghost' onClick={() => toggleSheet(false)}>Cancel</Button>
                    </div>
                </div>
            </form>
        </SheetLayout>
    )
}

export default RepositoryConnection