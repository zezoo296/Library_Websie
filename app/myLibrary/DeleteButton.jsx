"use client";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../provider";

async function handleDelete({ token, bookId, currentShelfId }) {
    let res = await fetch(
        `/api/library?bookId=${bookId}&shelfId=${currentShelfId}`,
        {
            headers: { Authorization: `Bearer ${token}` },
            method: "DELETE",
        }
    );
    if (!res.ok) throw new Error("Couldn't remove book from current shelf");
    return { message: "Book deleted successfully" };
}

export default function DeleteButton({ token, bookId, currentShelfId }) {
    const { mutate, isPending } = useMutation({
        mutationFn: handleDelete,
        onSuccess: (data) => {
            alert(data.message);
            queryClient.invalidateQueries(["library", currentShelfId]);
        },
        onError: (error) => {
            alert(error.message);
        },
    });

    return (
        <button
            disabled={isPending}
            className="cursor-pointer flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
            onClick={() => mutate({ token, bookId, currentShelfId })}
        >
            <FaTrash className="w-4 h-4" />
            {isPending ? "Removing..." : "Remove"}
        </button>
    );
}
