'use client'
import React, { useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchBooks } from '../../lib/api/books';
import Loader from '../../UI/Loader';
import BookCard from '../../components/BookCard';
import PageButton from '../../UI/PageButton';
import classes from './page.module.css';
import { DEFAULT_MAX_RESULTS } from '../../lib/apiConfig';

const BooksPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
    const [startIndex, setStartIndex] = useState(Number(searchParams.get('start') || 0));

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['books', searchTerm, startIndex],
        queryFn: () => searchBooks(searchTerm, startIndex),
        enabled: !!searchTerm
    });

    const currentPage = Math.floor(startIndex / DEFAULT_MAX_RESULTS) + 1;
    const totalPages = Math.ceil(data?.totalItems / DEFAULT_MAX_RESULTS) || 1;
    const timerRef = useRef();

    const handleSearch = (e) => {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            if (!e.target.value) return;
            setStartIndex(0);
            setSearchTerm(e.target.value);
            router.push(`/books?q=${encodeURIComponent(e.target.value)}&start=0`);
        }, 800);
    };

    const nextPage = () => {
        const newIndex = startIndex + DEFAULT_MAX_RESULTS;
        setStartIndex(newIndex);
        router.push(`/books?q=${encodeURIComponent(searchTerm)}&start=${newIndex}`);
    };

    const prevPage = () => {
        const newIndex = startIndex - DEFAULT_MAX_RESULTS;
        setStartIndex(newIndex);
        router.push(`/books?q=${encodeURIComponent(searchTerm)}&start=${newIndex}`);
    };

    useEffect(() => {
        setSearchTerm(searchParams.get('q') || '');
        setStartIndex(Number(searchParams.get('start') || 0));
    }, [searchParams]);

    return (
        <>
            <div className='flex flex-col '>
                <h1 className='text-center font-bold text-3xl md:text-4xl my-5'>
                    Start by searching for your favourite book!
                </h1>
                <input
                    type='text'
                    className='w-[100%] outline-none md:w-[500px] focus:shadow-md focus:shadow-gray-500 p-2 rounded mt-5 mb-10 mx-auto bg-white text-black'
                    placeholder='Search by title/author/category'
                    onChange={handleSearch}
                    defaultValue={searchTerm}
                />
            </div>

            {isLoading && <Loader />}
            {isError && <h1>{error.message}</h1>}

            {searchTerm && (data?.items?.length > 0 ? (
                <div className={classes.books}>
                    {data.items.map(book => <BookCard key={book.id} book={book} />)}
                </div>
            ) : (
                !isLoading && <div className={classes['no-books-message']}>No books found</div>
            ))}

            {totalPages > 1 && (
                currentPage === 1 ? <div className='mx-auto w-fit'>
                    <PageButton pageNumber={2} type='NEXT' onClick={nextPage} />
                </div> : currentPage < totalPages ?
                    <div className='flex gap-8 justify-center'>
                        <PageButton pageNumber={currentPage - 1} type="PREV" onClick={prevPage} />
                        <PageButton pageNumber={currentPage + 1} type="NEXT" onClick={nextPage} />
                    </div> :
                    <div className='mx-auto w-fit'>
                        <PageButton pageNumber={currentPage - 1} type="PREV" onClick={prevPage} />
                    </div>
            )}
        </>
    );
};

export default BooksPage;
