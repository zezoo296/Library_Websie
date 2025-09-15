import React from 'react'
import BooksPage from './BooksPage'
import { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<h1>Loading your page...</h1>}>
        <BooksPage/>
    </Suspense>
  )
}

export default page
