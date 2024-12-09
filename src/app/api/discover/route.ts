import { NextResponse } from 'next/server';
import { db } from '@/lib/db';


export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const role = searchParams.get('role');
        const skills = searchParams.get('skills');
        const interests = searchParams.get('interests');


        // Build filters dynamically
        const filters: any = {};

        if (role) filters.role = role;
        if (skills) {
            filters.skills = {
                hasSome: skills.split(','), // Assume skills are comma-separated
            };
        }
        if (interests) {
            filters.interests = {
                hasSome: interests.split(','), // Assume interests are comma-separated
            };
        }

        // Fetch users with Prisma
        const users = await db.user.findMany({
            where: filters,
        });

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}



export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, currentUser } = body;


        if (!username) {
            return NextResponse.json(
                { message: "Username is required" },
                { status: 400 }
            );
        }

        console.log(currentUser)

        if (!currentUser) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const receiverData = await db.user.findUnique({
            where: { username },
        });
        const currentuserData = await db.user.findUnique({
            where: { email: currentUser },
        });

        if (!receiverData) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        console.log("current user ", currentuserData?.username)
        console.log("reciver user ", username)

        if (!currentuserData?.username) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }


        const isMentee = receiverData.role === "MENTEE";
        const isMatch = await db.match.findFirst({
            where: {
                senderUsername: currentuserData?.username,
                receiverUsername: username,
            },
        });

        if (isMatch) {

            return NextResponse.json(
                { message: "You have already sent a request." },
                { status: 401 }
            );
        }
        const newMatch = await db.match.create({
            data: {
                status: "PENDING",
                isMentee,
                receiverUsername: username,
                senderUsername: currentuserData?.username,
            },
        });

        return NextResponse.json({ message: "Connection request created" }, { status: 201 });
    } catch (err) {
        console.error('Error in POST /api/discover:', err);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
