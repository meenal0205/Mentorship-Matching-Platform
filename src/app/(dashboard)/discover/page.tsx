'use client';
import { Button } from '@/components/ui/button';
import { technicalInterests, skilldata } from '@/lib/skill-interest-data';
import { getUserdetails } from '@/lib/userDetails';
import { Filter, User2Icon } from 'lucide-react';
import React from 'react';
import { useState } from 'react';

export default function Discover() {
    const [role, setRole] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [interests, setInterests] = useState<string[]>([]);

    const [users, setUsers] = useState([]);
    const currentUser = getUserdetails()?.username;

    const availableSkills = skilldata;
    const availableInterests = technicalInterests;
    const fetchUsers = async () => {
        const queryParams = new URLSearchParams({
            ...(role && { role }),
            ...(skills.length && { skills: skills.join(',') }),
            ...(interests.length && { interests: interests.join(',') }),
            // Add username to the query
        });

        const response = await fetch(`/api/discover?${queryParams}`);
        const data = await response.json();
        console.log(data);
        setUsers(data);
    };


    const handleSkillsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
        setSkills(selectedOptions);
    };

    const handleInterestsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
        setInterests(selectedOptions);
    };

    const filteredUsers = users.filter((user: any) => user.email !== currentUser);


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
        <div className='p-4'>
            <h1 className='text-sm font-semibold text-gray-700 flex gap-x-2 place-items-center'>
                FILTER <Filter width={20} />
            </h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    fetchUsers();
                }}
                className='mb-10'
            >
                <div className='flex flex-col md:flex-row lg:flex-row gap-x-5 mb-3 border-gray-300 border-2 p-2 rounded-sm pl-5 gap-y-3'>
                    <div className='flex flex-col'>
                        <label className='text-xs font-bold text-gray-700'>ROLE</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className='border-gray-600 text-gray-700 rounded-md p-1.5 border-[1px]'
                        >
                            <option value="">Select Role</option>
                            <option value="MENTEE">Mentee</option>
                            <option value="MENTOR">Mentor</option>
                        </select>
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-xs font-bold text-gray-700'>SKILLS</label>
                        <select
                            multiple
                            value={skills}
                            onChange={handleSkillsChange}
                            className='border-gray-600 text-gray-700 rounded-md p-2 border-[1px] h-20 mb-1'
                        >
                            <option value="">
                                All
                            </option>
                            {availableSkills.map((skill) => (
                                <option key={skill} value={skill}>
                                    {skill}
                                </option>
                            ))}
                        </select>
                        <p className='text-xs text-gray-500'>
                            Hold Ctrl (Windows) or Cmd (Mac) to select multiple skills.
                        </p>
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-xs font-bold text-gray-700'>INTERESTS</label>
                        <select
                            multiple
                            value={interests}
                            onChange={handleInterestsChange}
                            className='border-gray-600 text-gray-700 rounded-md p-2 border-[1px] h-20 mb-1'
                        >
                            <option value="">
                                All
                            </option>
                            {availableInterests.map((interest) => (
                                <option key={interest} value={interest}>
                                    {interest}
                                </option>
                            ))}
                        </select>
                        <p className='text-xs text-gray-500'>
                            Hold Ctrl (Windows) or Cmd (Mac) to select multiple interests.
                        </p>
                    </div>

                    <Button type="submit" className='mt-9 ml-auto'>
                        Search
                    </Button>
                </div>
            </form>

            <h2 className='text-sm font-bold text-gray-700'>RESULTS</h2>
            <div className="flex flex-wrap justify-center">
                {filteredUsers.length > 0 ? (filteredUsers.map((user: any) => (
                    <div
                        key={user.id}
                        className="flex flex-col items-center  mr-3 mb-3 w-full md:w-1/2  lg:w-1/4 p-4 border-2 border-gray-300 rounded"
                    >
                        <User2Icon width={40} height={40} className="mb-2" />
                        <p className="text-center">
                            <span>{user.username}</span> - <span>{user.role}</span>
                        </p>
                        <div className="text-center w-full mb-3">
                            <h1 className='font-semibold text-sm'>Interests</h1>
                            <div className='flex flex-wrap gap-3 text-xs text-gray-500'>
                                {user.interests.map((element: string, index: number) => (
                                    <p key={`interest-${index}`} className='border-[1px] border-black p-1 rounded-md'>{element}</p>
                                ))}
                            </div>
                            <h1 className='font-semibold text-sm'>Skills</h1>
                            <div className='flex flex-wrap gap-3 text-xs text-gray-500'>
                                {user.skills.map((element: string, index: number) => (
                                    <p key={`skill-${index}`} className='border-[1px] border-black p-1 rounded-md'>{element}</p>
                                ))}
                            </div>
                        </div>
                        <Button className='w-full my-auto ' onClick={() => { sendConnectionRequest(user.username, currentUser || "") }} >Connect</Button>
                    </div>
                ))) : (<p>No records found</p>)}
            </div>
        </div>
    );
}
