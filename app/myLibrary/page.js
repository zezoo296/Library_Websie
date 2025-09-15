import React from 'react'
import MyLibraryPage from './MyLibrary'
import { Suspense } from 'react'

const page = () => {
    return (
        <Suspense fallback={<h1>Loading your page...</h1>}>
            <MyLibraryPage />
        </Suspense>
    )
}

export default page
