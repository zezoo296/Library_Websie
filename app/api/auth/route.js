import { NextResponse } from "next/server";

export async function POST(req) {
    //Login
    const { access_token } = await req.json();

    const res = NextResponse.json({ message: "Token stored" });
    res.cookies.set({
        name: 'token',
        value: access_token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60
    })

    return res;
}

export async function GET(req) {
    // Getting user profile info
    const token = req.cookies.get('token')?.value;
    if (!token) {
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 }
        );
    }

    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const profile = await res.json();

    return NextResponse.json(profile);
}

export async function DELETE() {
    const res = NextResponse.json({ message: "User logged out", status: 200 });
    res.cookies.delete('token');
    return res;
}