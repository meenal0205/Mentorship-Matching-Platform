import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { compare } from 'bcrypt'


export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, password } = body;

        const existingUserByEmail = await db.user.findUnique({ where: { email: email } })

        if (!existingUserByEmail) {
            return NextResponse.json({
                user: null,
                message: "User does not exist please sign up"
            }, { status: 302 })
        }

        if (compare(existingUserByEmail?.password, password)) {
            return NextResponse.json({
                user: { "username": existingUserByEmail?.username, "email": existingUserByEmail?.email },
                message: "User logged in succesfully"
            }, { status: 201 })
        }
        else {
            return NextResponse.json({
                user: null,
                message: "Password incorrect"
            }, { status: 302 })

        }
    }
    catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}