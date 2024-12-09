import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json(
                { error: "Email query parameter is required" },
                { status: 400 }
            );
        }

        const userData = await db.user.findUnique({ where: { email: email } })
        if (!userData) {
            return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        }
        else {
            const { password: newUserPassword, ...rest } = userData
            return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 })
        }
    }
    catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body) {
            return NextResponse.json({ error: "Request body is required" }, { status: 400 });
        }

        const { email, username, role, skills, interests, bio } = body;

        const existingUserByEmail = await db.user.findUnique({ where: { email: email } });

        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 });
        }
        await db.user.update({
            where: { username: username },
            data: { username, email, role, skills, interests, bio },
        });

        return NextResponse.json({ message: "User updated successfully" }, { status: 201 });
    } catch (error) {
        console.log('Error occurred:', error);
        return NextResponse.json({ error: error || "Internal server error" }, { status: 500 });
    }
}

