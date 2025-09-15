import { NextResponse } from "next/server";

export async function POST(request) {
    const url = new URL(request.url);
    const bookId = url.searchParams.get("bookId");
    const shelfId = url.searchParams.get("shelfId");
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
        return NextResponse.json({ success: false, message: "No token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    
    const res = await fetch(
        `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/addVolume?volumeId=${bookId}`,
        {
            headers: { Authorization: `Bearer ${token}` },
            method: "POST"
        }
    );

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return NextResponse.json(
            { success: false, message: "Couldn't add the book", error: err },
            { status: res.status }
        );
    }

    return NextResponse.json({ success: true, message: "Book added successfully" }, { status: 200 });
}

export async function DELETE(request) {
    const url = new URL(request.url);
    const bookId = url.searchParams.get("bookId");
    const shelfId = url.searchParams.get("shelfId");
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
        return NextResponse.json({ success: false, message: "No token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const res = await fetch(
        `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/removeVolume?volumeId=${bookId}`,
        {
            method: "POST", // Google API still requires POST
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return NextResponse.json(
            { success: false, message: "Couldn't delete the book", error: err },
            { status: res.status }
        );
    }

    return NextResponse.json({ success: true, message: "Book deleted successfully" }, { status: 200 });
}

export async function GET(request) {
    const url = new URL(request.url);
    const shelfId = url.searchParams.get("shelfId");
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
        return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const res = await fetch(
        `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/volumes`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    if (res.status === 404) {
        return NextResponse.json([]);
    }

    if (!res.ok) {
        return NextResponse.json(
            { error: "Something went wrong. Please try again!" },
            { status: res.status }
        );
    }

    const data = await res.json();


    return NextResponse.json(data.items || []);
}
