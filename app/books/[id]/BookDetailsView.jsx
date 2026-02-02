import classes from "./page.module.css";
import { FaStar } from "react-icons/fa";
import PrimaryButton from "../../../UI/PrimaryButton";
import Link from "next/link";
import Notes from "../../../components/Notes";
import BookFavourite from "./BookFavourite";

export default function BookDetailsView({ data, id }) {
    const bookData = data?.volumeInfo;
    const thumbnail =
        bookData?.imageLinks?.thumbnail ||
        bookData?.imageLinks?.smallThumbnail ||
        "/images/no-cover.png";

    const bookPrice =
        data?.saleInfo?.saleability === "FREE"
            ? "0.00"
            : data?.saleInfo?.listPrice
            ? `${data.saleInfo.listPrice.amount} ${data.saleInfo.listPrice.currencyCode}`
            : data?.saleInfo?.retailPrice
            ? `${data.saleInfo.retailPrice.amount} ${data.saleInfo.retailPrice.currencyCode}`
            : "Price Unavailable";

    return (
        <>
            <div className={classes.content}>
                <div className={classes["book-info"]}>
                    <h1>{bookData.title}</h1>
                    <div className={classes.author}>
                        by{" "}
                        {bookData.authors?.map((author, i) => (
                            <span className="mx-1" key={i}>
                                {author}
                            </span>
                        ))}{" "}
                    </div>
                    <div className={classes.rating}>
                        {bookData.averageRating && (
                            <>
                                {Array.from({
                                    length: Math.floor(bookData.averageRating),
                                }).map((_, i) => (
                                    <FaStar color="yellow" key={i} size={40} />
                                ))}
                                <span className="text-4xl">{` ${bookData.averageRating.toFixed(
                                    1
                                )}`}</span>
                            </>
                        )}
                    </div>
                    <div className={classes.category}>
                        {bookData.categories?.map((c) => `${c} `)}
                    </div>
                    <hr />
                    <div className={classes.type}>Paperback</div>
                    <div className="flex justify-between flex-wrap items-center">
                        <div className={classes.price}>{bookPrice}</div>
                        <BookFavourite id={id} />
                    </div>

                    <hr />
                    <p className={classes.description}>
                        {bookData.description ? (
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: bookData.description,
                                }}
                            />
                        ) : (
                            "No description available"
                        )}
                    </p>
                </div>

                <div className={classes["book-image"]}>
                    <img
                        src={thumbnail}
                        alt={bookData.title}
                        target="_blank"
                        rel="noopener noreferrer"
                    />
                    <Link
                        href={bookData.canonicalVolumeLink || bookData.infoLink}
                        target="_blank"
                        className="mt-3"
                    >
                        <PrimaryButton>Available</PrimaryButton>
                    </Link>
                </div>
            </div>
            <div className="max-w-[1200px] mx-auto mt-3">
                <Notes bookId={id} />
            </div>
        </>
    );
}
