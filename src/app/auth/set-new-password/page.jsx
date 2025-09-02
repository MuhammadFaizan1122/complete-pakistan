import SetNewPassword from '../../../components/SetNewPassword/SetNewPassword'
import React from 'react'

const page = ({ searchParams }) => {
    return (
        <>
            <SetNewPassword searchParams={searchParams} />
        </>
    )
}

export default page