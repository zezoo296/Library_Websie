export async function getNotes(bookId) {
    const res = await fetch(`/api/notes?bookId=${bookId}`);
    return await res.json();
}

export async function addNote(bookId, content, user) {
    const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, content, user}),
    });
    if (!res.ok) throw new Error("Failed to add note");
    return res.json();
}