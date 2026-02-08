'use client'
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import FavouriteButton from "./FavouriteButton";

export default function BookFavourite({id}){
    const { isAuthenticated } = useContext(AuthContext);

    return (<>
        {isAuthenticated && <FavouriteButton bookId={id} />}
    </>)
}