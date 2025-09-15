'use client'
import React from 'react'
import classes from './page.module.css'
import { useQuery } from '@tanstack/react-query';
import { getBookDetails } from '../../../lib/api/books';
import Loader from '../../../UI/Loader';
import { FaStar } from 'react-icons/fa';
import PrimaryButton from '../../../UI/PrimaryButton';
import Link from 'next/link';
import FavouriteButton from './FavouriteButton';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const BookDetailsPage = ({ params }) => {
    const id = params.id;
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [id],
        queryFn: () => getBookDetails(id)
    });
    const { isAuthenticated } = useContext(AuthContext);

    const bookData = data?.volumeInfo;
    const thumbnail =
        bookData?.imageLinks?.thumbnail ||
        bookData?.imageLinks?.smallThumbnail ||
        "/images/no-cover.png";

    const bookPrice =
        data?.saleInfo?.saleability === 'FREE' ? '0.00' :
            data?.saleInfo?.listPrice
                ? `${data.saleInfo.listPrice.amount} ${data.saleInfo.listPrice.currencyCode}`
                : data?.saleInfo?.retailPrice
                    ? `${data.saleInfo.retailPrice.amount} ${data.saleInfo.retailPrice.currencyCode}`
                    : "Price Unavailable";

    return (
        <>
            {isLoading && <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
                <Loader />
            </div>}

            {isError && <h1>{error.message}</h1>}

            {data &&
                <div className={classes.content}>
                    <div className={classes['book-info']}>
                        <h1>{bookData.title}</h1>
                        <div className={classes.author}>by {bookData.authors?.map(author => <span className='mx-1'>{author}</span>)} </div>
                        <div className={classes.rating}>
                            {bookData.averageRating && (
                                <>
                                    {Array.from({ length: Math.floor(bookData.averageRating) }).map((_, i) => (
                                        <FaStar color='yellow' key={i} size={40} />
                                    ))}
                                    <span className='text-4xl'>{` ${bookData.averageRating.toFixed(1)}`}</span>
                                </>
                            )}
                        </div>
                        <div className={classes.category}>{bookData.categories?.map(c => `${c} `)}</div>
                        <hr />
                        <div className={classes.type}>Paperback</div>
                        <div className='flex justify-between flex-wrap items-center'>
                            <div className={classes.price}>{bookPrice}</div>
                            {isAuthenticated && <FavouriteButton bookId={data.id} />}
                        </div>

                        <hr />
                        <p
                            className={classes.description}
                            dangerouslySetInnerHTML={{ __html: bookData.description }}
                        ></p>
                    </div>

                    <div className={classes['book-image']}>
                        <img src={thumbnail} alt={bookData.title} target="_blank" rel="noopener noreferrer" />
                        <Link href={bookData.canonicalVolumeLink || bookData.infoLink} target='_blank' className='mt-3'>
                            <PrimaryButton>
                                Available
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>}
        </>
    )
}

export default BookDetailsPage
