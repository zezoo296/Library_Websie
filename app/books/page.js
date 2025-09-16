import React from 'react'
import BooksPage from './BooksPage'
import { Suspense } from 'react'
import Loader from '../../UI/Loader'

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
        <BooksPage/>
    </Suspense>
  )
}

export default page
