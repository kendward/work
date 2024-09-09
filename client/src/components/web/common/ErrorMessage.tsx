import { cn } from '@/utils'
import React from 'react'

interface ErrorMessageProps {
    message: string | null | undefined
    className?: string
}
function ErrorMessage({ message, className }: ErrorMessageProps) {
    return message && <p className={cn('text-clr-danger text-sm font-normal text-center my-6', className)}>{message}</p>

}

export default ErrorMessage