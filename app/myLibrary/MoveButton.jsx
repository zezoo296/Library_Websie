// MoveButton.jsx
"use client";
import { FaArrowRight } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../provider";

async function handleMove({ token, bookId, shelfId, currentShelfId }) {
    if (shelfId === currentShelfId) return;
    let res = await fetch(
        `/api/library?bookId=${bookId}&shelfId=${currentShelfId}`,
        {
            headers: { Authorization: `Bearer ${token}` },
            method: "DELETE",
        }
    );
    if (!res.ok) throw new Error("Couldn't remove book from current shelf");

    res = await fetch(`/api/library?bookId=${bookId}&shelfId=${shelfId}`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
    });
    if (!res.ok) {
        // rollback
        await fetch(`/api/library?bookId=${bookId}&shelfId=${currentShelfId}`, {
            headers: { Authorization: `Bearer ${token}` },
            method: "POST",
        });
        throw new Error("Couldn't add book to needed shelf");
    }
    return { shelfId, message: "Book moved successfully" };
}

export default function MoveButton({ token, bookId, currentShelfId }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const { mutate, isPending } = useMutation({
        mutationFn: handleMove,
        onSuccess: (data) => {
            alert(data.message);
            queryClient.invalidateQueries(["library", currentShelfId]);
            if (data.shelfId)
                queryClient.invalidateQueries(["library", data.shelfId]);
        },
        onError: (error) => {
            alert(error.message);
        },
    });

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                disabled={isPending}
                className="cursor-pointer flex items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-sm"
            >
                <FaArrowRight className="w-4 h-4" />{" "}
                {isPending ? "Moving..." : "Move"}
            </button>

            {open && (
                <div className="absolute mt-2 w-32 bg-neutral-800 shadow-lg rounded-md overflow-hidden z-10 top-[-9.5em] right-[-5em]">
                    {[0, 2, 3, 4].map((shelf) => (
                        <button
                            key={shelf}
                            onClick={() => {
                                setOpen(false);
                                mutate({
                                    token,
                                    bookId,
                                    shelfId: shelf,
                                    currentShelfId,
                                });
                            }}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100 hover:text-black text-sm cursor-pointer"
                        >
                            {shelf === 0
                                ? "Favourite"
                                : shelf === 2
                                ? "To Read"
                                : shelf === 3
                                ? "Reading Now"
                                : "Have Read"}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
