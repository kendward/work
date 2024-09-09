import { cn } from '@/utils'
import React from 'react'

interface SuccessMessageProps {
    message: string | null | undefined
    className?: string
}
function SuccessMessage({ message, className }: SuccessMessageProps) {
    return message && <p className={cn('text-clr-blue-primary text-sm font-normal text-center my-6', className)}>{message}</p>

}

export default SuccessMessage