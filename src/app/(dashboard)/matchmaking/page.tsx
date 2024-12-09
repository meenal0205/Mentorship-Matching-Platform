'use client'

import { Button } from '@/components/ui/button';
import { getUserdetails } from '@/lib/userDetails';
import { log } from 'console';
import { Loader, LoaderPinwheel } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function MatchUsers() {
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const userEmail = getUserdetails()?.username;
    const [mentee, setmentee] = useState<any[]>([])
    const [mentor, setmentor] = useState<any[]>([])



    useEffect(() => {

        setLoading(true)
        async function fetchMatches() {
            const response = await fetch(`/api/match-user?email=${userEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data);
            if (data.matches) {
                setMatches(data.matches);
                setmentor([]);
                setmentee([]);
                data.matches.filter((element: any) => {
                    if (element.role === 'MENTOR') {
                        setmentor((prevMentors) => [...prevMentors, element]);
                    } else {
                        setmentee((prevMentees) => [...prevMentees, element]);
                    }

                })

            }

        }

        fetchMatches();
    }, []);


    const sendConnectionRequest = async (username: string, currentUser: string) => {
        try {

            console.log(username)



            const response = await fetch(`/api/discover`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    currentUser
                }),
            });
            const res = await response.json();

            if (!response.ok) {
                alert(res.message);
                return;
            }


        } catch (error) {
            console.error('Error sending connection request:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Matched Users</h2>

            <div className='m-4'>
                <h1 className='font-semibold text-sm mb-2'>MENTORS</h1>

                {mentor.length > 0 ?
                    (<div className='flex flex-wrap  '>
                        {mentor.map((match, index) => (
                            <div key={index} className=" mr-4 p-4 border rounded-md  ">
                                <p>
                                    <strong>{match.username}</strong>
                                </p>
                                <p>Skill Similarity: {Math.round(match.skillSimilarity * 100)}%</p>
                                <p>Interest Similarity: {Math.round(match.interestSimilarity * 100)}%</p>
                                <p className='mb-2'>Total Similarity: {Math.round(match.totalSimilarity * 100)}%</p>
                                <Button className='w-full my-auto ' onClick={() => { sendConnectionRequest(match.username, userEmail) }} >Connect</Button>
                            </div>
                        ))}
                    </div>) : ("No records found")
                }

            </div>
            <div className='m-4'>
                <h1 className='font-semibold text-sm mb-2' >MENTEES</h1>

                {mentee.length > 0 &&
                    <div className='flex flex-wrap  '>
                        {mentee.map((match, index) => (
                            <div key={index} className=" mr-4 p-4 border rounded-md  ">
                                <p>
                                    <strong>{match.username}</strong>
                                </p>
                                <p>Skill Similarity: {Math.round(match.skillSimilarity * 100)}%</p>
                                <p>Interest Similarity: {Math.round(match.interestSimilarity * 100)}%</p>
                                <p className='mb-2'>Total Similarity: {Math.round(match.totalSimilarity * 100)}%</p>
                                <Button className='w-full my-auto ' onClick={() => { sendConnectionRequest(match.username, userEmail) }} >Connect</Button>
                            </div>
                        ))}
                    </div>
                }
            </div>

        </div>
    );
}
