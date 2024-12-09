import { db } from "@/lib/db";
import Email from "next-auth/providers/email";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, username, bio, skills, interests } = body;

        console.log(email, username, bio, skills, interests)

        const existingUserByEmail = await db.user.findUnique({ where: { email: email } })

        if (!existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email does not exist" }, { status: 409 })
        }

        const newUser = await db.user.update({
            where: { email },
            data: {
                username,
                email,
                skills,
                interests,
                bio
            }
        });

        return NextResponse.json({ message: "User updated successfully" }, { status: 201 })
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    let username = searchParams.get("username");
    console.log(username)
    if (!username) {
        return NextResponse.json({ error: "Username is required" }, { status: 500 });
    }
    const data = await db.user.findUnique({
        where: {
            username
        }
    })
    console.log(data);
    const userdetails = {
        username: data?.username,
        email: data?.email,
        bio: data?.bio,
        interests: data?.interests,
        skills: data?.skills,
    }

    return NextResponse.json({ userdetails, status: 201 })

}