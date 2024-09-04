import { cn } from '@/lib/utils'
import React from 'react'

interface ISheetLayout {
    children: React.ReactNode
    classNames?: string
}

function SheetLayout({ children, classNames }: ISheetLayout) {
    return (
        <div className={cn("mt-6 md:mt-16 w-full max-w-3xl", classNames)}>{children}</div>
    )
}
export default SheetLayout