import Link from "next/link";
import React from "react";
import Image from "next/image";
import classes from "./BookCard.module.css";
import { FaStar } from "react-icons/fa";

const BookCard = ({ book }) => {
    const bookData = book.volumeInfo;

    const thumbnail =
        bookData.imageLinks?.thumbnail ||
        bookData.imageLinks?.smallThumbnail ||
        "/images/no-cover.png";

    return (
        <div className={classes.book}>
            <Link href={`/books/${book.id}`}>
                <div className={classes.img}>
                    <Image
                        fill
                        src={thumbnail}
                        alt={`${bookData.title}`}
                    />
                </div>

                <div className={classes.description}>
                    {!bookData.title && "Not Titled"}
                    {bookData.title && `${bookData.title}`}

                    {bookData.subtitle && (
                        <>
                            <br />
                            `${bookData.subtitle}`
                        </>
                    )}
                </div>
                <div className={classes.more}>
                    <div className={classes.author}>
                        by <u>{bookData.authors || "Me"}</u>
                    </div>
                    <div className={classes.rating}>
                        {bookData.averageRating &&
                            Array.from({ length: bookData.averageRating }).map(
                                (_, i) => <FaStar key={i}/>
                            )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default BookCard;
