"use client";
import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import PrimaryButton from "../../../UI/PrimaryButton";

async function addToFavourite(token, bookId) {
    const res = await fetch(`/api/library?shelfId=0&bookId=${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
    });
    if (!res.ok) throw new Error("Couldn't add book!");
    return res.json();
}

async function removeFromFavourite(token, bookId) {
    const res = await fetch(`/api/library?shelfId=0&bookId=${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Couldn't delete book!");
    return res.json();
}

export default function FavouriteButton({ bookId }) {
    const { token, favourites, setFavourites } = useContext(AuthContext);
    const [added, setAdded] = useState(favourites.includes(bookId));

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: ({ token, bookId }) =>
            added
                ? removeFromFavourite(token, bookId)
                : addToFavourite(token, bookId),
        onSuccess: () => {
            setFavourites(
                (prevFav) =>
                    added
                        ? prevFav.filter((id) => id !== bookId) 
                        : [...prevFav, bookId] 
            );
            window.alert(
                added ? "Book removed successfully" : "Book added successfully"
            );
            setAdded((prevState) => !prevState);
        },
    });

    function handleClick() {
        mutate({ token, bookId });
    }

    return (
        <>
            {isError ? (
                <div className="text-red-500 p-3">{error.message}</div>
            ) : isPending ? (
                added ? (
                    <PrimaryButton
                        extraClasses="!w-fit !h-fit p-5"
                        onClick={handleClick}
                    >
                        Removing From Favorites...
                    </PrimaryButton>
                ) : (
                    <PrimaryButton
                        extraClasses="!w-fit !h-fit p-5"
                        onClick={handleClick}
                    >
                        Adding to Favorites...
                    </PrimaryButton>
                )
            ) : (
                <PrimaryButton
                    extraClasses="!w-fit !h-fit p-5"
                    onClick={handleClick}
                >
                    {added ? "💔 Remove from Favorites" : "❤️ Add to Favorites"}
                </PrimaryButton>
            )}
        </>
    );
}
