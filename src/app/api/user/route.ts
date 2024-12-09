import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, username, password, role } = body;

        const existingUserByEmail = await db.user.findUnique({ where: { email: email } })

        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 })
        }

        const existingUserByUsername = await db.user.findUnique({ where: { username: username } })

        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "User with this username alreadt exists" }, { status: 409 })
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role,
                skills: [],
                interests: [],
                bio: "",
            },
        });

        const { password: newPassword, ...rest } = newUser

        return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 })
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}