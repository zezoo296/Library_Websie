// Actions.jsx
"use client";
import DeleteButton from "./DeleteButton";
import MoveButton from "./MoveButton";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Actions({ bookId, currentShelfId }) {
    const { token } = useContext(AuthContext);

    return (
        <div className="flex gap-5 relative">
            <DeleteButton
                token={token}
                bookId={bookId}
                currentShelfId={currentShelfId}
            />
            <MoveButton
                token={token}
                bookId={bookId}
                currentShelfId={currentShelfId}
            />
        </div>
    );
}
