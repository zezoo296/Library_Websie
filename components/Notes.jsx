import { useCallback, useEffect, useState, useRef, useContext } from "react";
import PrimaryButton from "../UI/PrimaryButton";
import { getNotes, addNote } from "../lib/api/notes";
import { AuthContext } from "../context/AuthContext";

export default function Notes({ bookId }) {
    const userNote = useRef();
    const [communityNotes, setCommunityNotes] = useState([]);
    const { isAuthenticated, user } = useContext(AuthContext);

    const fetchNotes = useCallback(async () => {
        const data = await getNotes(bookId);
        setCommunityNotes(data);
    }, [bookId]);

    const handleAddNote = useCallback(async () => {
        await addNote(bookId, userNote.current.value, user);
        userNote.current.value = "";
        fetchNotes();
    }, [bookId, user, fetchNotes]);

    useEffect(() => {
        fetchNotes();
    }, [bookId]);

    return (
        <>
            <hr className="border-[1.7px] border-solid m-[5px] w-full" />

            <h2 className="text-3xl font-bold mb-3 mt-5 mx-auto w-fit">
                📝 Notes
            </h2>

            {/* Add note */}
            {!isAuthenticated && (
                <p className="mx-auto w-fit font-bold text-xm">
                    Login to add your own notes!
                </p>
            )}
            {isAuthenticated && (
                <>
                    <textarea
                        className="w-full p-2 border rounded mb-2 md:text-xl"
                        placeholder="Write your thoughts..."
                        ref={userNote}
                    />
                    <PrimaryButton onClick={handleAddNote}>
                        Add Note
                    </PrimaryButton>
                </>
            )}

            {/* Community Notes */}
            <h3 className="text-2xl font-semibold mt-6 mb-4">
                🌍 Community Notes
            </h3>
            {communityNotes.length === 0 ? (
                <p className="text-gray-500">No community notes yet.</p>
            ) : (
                communityNotes.map((note, i) => (
                    <div key={i} className="p-2 border-b mt-3">
                        <div className="flex gap-3">
                            <img
                                className="rounded-[50%] w-10 h-10"
                                src={note.user.picture}
                            />
                            <div>
                                <div className="flex gap-1 items-center mt-[-5px] text-xs">
                                    <p>{note.user.userName} at </p>                              
                                    <span className="text-gray-500">
                                        {note.date}
                                    </span>
                                </div>

                                <p>{note.content}</p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}
