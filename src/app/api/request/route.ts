import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        console.log(email)


        if (!email) {
            return NextResponse.json({ error: "Username is required" }, { status: 500 });
        }

        const data = await db.user.findUnique({ where: { email } });
        console.log(data?.username);
        const username = data?.username

        if (!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 500 });
        }

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const sentRequest = await db.match.findMany({
            where: {
                senderUsername: username,

                updatedAt: {
                    gte: oneWeekAgo,
                }
            },
            orderBy: {
                updatedAt: 'desc',
            },

        })

        const receivedRequest = await db.match.findMany({
            where: {
                receiverUsername: username,
                status: 'PENDING',
                updatedAt: {
                    gte: oneWeekAgo,
                }
            },
            orderBy: {
                updatedAt: 'desc',
            },
        })

        return NextResponse.json({ data: { sent: sentRequest, received: receivedRequest }, status: 201 })


    } catch (err) {
        return NextResponse.json({ error: "Internal server error", status: 500 })
    }
}

export async function POST(req: Request) {
    const body = await req.json();
    const { isAccepted, senderUsername, receiverUsername } = body;

    console.log(isAccepted, senderUsername, receiverUsername);

    if (senderUsername && receiverUsername) {
        try {
            const status = isAccepted ? "ACCEPTED" : "REJECTED";

            const data = await db.match.updateMany({
                where: {
                    AND: [
                        { senderUsername: senderUsername },
                        { receiverUsername: receiverUsername },
                    ],
                },
                data: {
                    status: status,
                },
            });

            if (data.count === 0) {
                return new Response(JSON.stringify({ error: "Match not found" }), { status: 404 });
            }

            return new Response(JSON.stringify({ success: true, status }), { status: 200 });
        } catch (error) {
            console.error("Error updating match:", error);
            return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
        }
    } else {
        return new Response(JSON.stringify({ error: "Data not found" }), { status: 400 });
    }
}
