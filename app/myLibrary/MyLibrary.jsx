'use client'
import { useState, useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import Loader from '../../UI/Loader'
import BookCard from '../../components/BookCard'
import classes from './page.module.css'
import Actions from './Actions'

async function getShelfData(category) {
    const res = await fetch(`/api/library?shelfId=${category}`, {
        method: "GET"
    })

    if (!res.ok) throw new Error("Couldn't fetch books!")
    return res.json();
}

const MyLibraryPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [category, setCategory] = useState(Number(searchParams.get('shelfId') || 0))

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['library', category],
        queryFn: () => getShelfData(category)
    })

    useEffect(() => {
        const cat = Number(searchParams.get('shelfId') || 0)
        setCategory(cat)
    }, [searchParams])

    function changeCategory(newCat) {
        setCategory(newCat)
        router.push(`/myLibrary?shelfId=${newCat}`)
    }

    return (
        <>
            <div className={classes.categories}>
                <button className={`${classes.button} ${category === 0 ? classes.active : ''}`} onClick={() => changeCategory(0)}>Favourites</button>
                <button className={`${classes.button} ${category === 2 ? classes.active : ''}`} onClick={() => changeCategory(2)}>To Read</button>
                <button className={`${classes.button} ${category === 3 ? classes.active : ''}`} onClick={() => changeCategory(3)}>Reading Now</button>
                <button className={`${classes.button} ${category === 4 ? classes.active : ''}`} onClick={() => changeCategory(4)}>Have Read</button>
            </div>

            {isLoading && <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
                <Loader />
            </div>}
            {isError && <h1>{error.message}</h1>}

            {!isLoading && data?.length > 0 && (
                <div className={classes.books}>
                    {data.map(book =><div key={book.id} className='flex flex-col justify-center items-center w-full gap-3'>
                        <BookCard key={book.id} book={book} />
                        <Actions bookId={book.id} currentShelfId={category}/>
                    </div> )}
                </div>
            )}

            {!isLoading && data?.length === 0 && (
                <div className={classes['no-books-message']}>No books found</div>
            )}
        </>
    )
}

export default MyLibraryPage
