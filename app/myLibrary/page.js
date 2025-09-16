import React from 'react'
import MyLibraryPage from './MyLibrary'
import { Suspense } from 'react'
import Loader from '../../UI/Loader'

const page = () => {
    return (
        <Suspense fallback={<Loader />}>
            <MyLibraryPage />
        </Suspense>
    )
}

export default page
