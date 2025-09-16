import { NextResponse } from "next/server";

let notes = [
    {
        bookId: '7bmW-U3w8d8C',
        content: "Amazing book",
        date: '9/15/2025, 10:44 PM',
        user: {
            userName: "Hamada",
            picture: "https://media.desenio.com/site_images/67f90fcb2605b062a6b85957_388138212_pp0264_main_image_DS.jpg"
        }
    }
];

export async function GET(requset) {
    const url = new URL(requset.url);
    const bookId = url.searchParams.get('bookId');
    return NextResponse.json(notes.filter(note => note.bookId === bookId));
}

export async function POST(request) {
    const body = await request.json();
    const { bookId, content, user } = body;
    notes.push({
        bookId,
        content,
        date: new Date().toLocaleString(),
        user
    });
    return NextResponse.json({ status: 200 });
}

