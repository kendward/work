import React from 'react'
import SuccessMessage from './SuccessMessage'
import ErrorMessage from './ErrorMessage'

interface ShowMessageProps {
    success?: string | null
    error?: string | null
    className?: string
}
function ShowMessage({ error, success, className }: ShowMessageProps): JSX.Element {
    return (
        <>
            {success && <SuccessMessage message={success} className={className} />}
            {error && <ErrorMessage message={error} className={className} />}
        </>
    )
}
export default ShowMessage