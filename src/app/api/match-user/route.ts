import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Make sure db is set up with Prisma

function calculateSimilarity(arr1: string[], arr2: string[]): number {
    const commonElements = arr1.filter(element => arr2.includes(element));
    return commonElements.length / Math.max(arr1.length, arr2.length);
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const currentUser = searchParams.get("email");

        if (!currentUser) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        const currentUserData = await db.user.findUnique({ where: { email: currentUser } })
        if (!currentUserData) {
            return NextResponse.json({ error: 'data not found' }, { status: 404 });
        }




        const users = await db.user.findMany({
            where: {
                NOT: {
                    username: currentUser
                }
            },
        });

        const matchedUsers = users.map(user => {
            const skillSimilarity = calculateSimilarity(currentUserData?.skills, user.skills);
            const interestSimilarity = calculateSimilarity(currentUserData?.interests, user.interests);

            const totalSimilarity = (skillSimilarity + interestSimilarity) / 2;

            return {
                username: user.username,
                role: user.role,
                skillSimilarity,
                interestSimilarity,
                totalSimilarity,
            };
        });

        matchedUsers.sort((a, b) => b.totalSimilarity - a.totalSimilarity);

        return NextResponse.json({ matches: matchedUsers }, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
