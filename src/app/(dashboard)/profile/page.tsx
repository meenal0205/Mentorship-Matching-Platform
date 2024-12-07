
'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getUserdetails, setUser } from '@/lib/userDetails'
import { CheckIcon, CrossIcon, Eye, User, User2, User2Icon, UserCheck, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db'


const UserProfile = () => {
    const router = useRouter();
    enum Role {
        MENTOR = 'MENTOR',
        MENTEE = 'MENTEE',
    }

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<Role>(Role.MENTEE);
    const [bio, setBio] = useState("");
    const [skills, setskills] = useState([])
    const [interests, setInterests] = useState([])




    const FormSchema = z.object({
        username: z.string().max(100),
        email: z.string(),
        role: z.enum(['MENTOR', 'MENTEE']),
        bio: z.string().max(200),
        skills: z.string().max(200),
        interests: z.string().max(200)

    })




    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        // defaultValues: {
        //     email: email,
        //     username: username,
        //     role: role,
        //     bio: bio
        // },
    })



    const removeInterest = (index: number) => {

        setInterests(interests)
        setInterests((prevInterests) => prevInterests.filter((_, i) => i !== index));

    }
    const removeSkill = (index: number) => {
        setskills((prevSkills) => prevSkills.filter((_, i) => i !== index));
    }



    const saveDetails = async () => {

        // try {
        //     const response = await fetch('/api/profile', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({

        //             "role": "developer",
        //             "skills": ["JavaScript", "React"],
        //             "interests": ["AI", "Web Development"],
        //             "bio": "Developer with a passion for coding."
        //         }),
        //     });
        //     if (!response.ok) {
        //         throw new Error(`Error: ${response.statusText}`);
        //     }

        //     const data = await response.json();
        //     console.log('Response Data:', data);
        // } catch (error) {
        //     console.log(error)
        // }


        console.log(username, email, skills, bio, interests)

    }


    useEffect(() => {
        const fetchProfileData = async (userEmail: string) => {
            const response = await fetch(`/api/profile?email=${userEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json(); // Parse the JSON data
                const user = data.user;

                setUsername(data.user.username)
                setEmail(data.user.email)
                setBio(data.user.bio)
                setskills(data.user.skills)
                setInterests(data.user.interests)
                setRole(data.user.role)
            }

        };




        const userEmail = getUserdetails()?.username;
        if (userEmail) {
            fetchProfileData(userEmail);
        }
    }, []);






    return (
        <div className='w-[80%] p-10'>
            <div className='lg:grid lg:grid-rows-2 lg:grid-cols-2 gap-4 sm:flex sm:flex-col '>

                <div className='row-span-1 col-span-1  bg-gray-100  flex flex-col items-center justify-center  text-slate-700 rounded-md shadow-md pt-4 pl-3 mb-4'>

                    <h2 className='font-semibold '>PERSONAL INFORMATION</h2>
                    <div className='flex  items-center p-3  '>




                        <User2Icon width={70} height={70} className='hidden lg:block  mr-10  border-slate-700 rounded-full mb-5' />
                        <div className='items-center'>
                            <p><span className='font-semibold '>{username}</span></p>
                            <p> <span>{email}</span></p>
                            <p className='text-wrap'> {bio}</p>
                        </div>


                    </div>
                </div>
                <div className='row-span-1 col-span-1 mb-4 bg-gray-100  flex flex-col items-center  text-slate-700 rounded-md shadow-md pt-4'>
                    <h2 className='font-semibold mt-0'>REQUESTS</h2>
                    <ul className='flex flex-wrap items-center' >
                        <li className='flex  pl-7  w-1/2'><span className='mr-6'>Username</span> <CheckIcon className='text-green-500' /> <X className='text-red-500' /> <Eye /></li>
                        <li className='flex  pl-7  w-1/2'><span className='mr-6'>Username</span> <CheckIcon className='text-green-500' /> <X className='text-red-500' /> <Eye /></li>
                        <li className='flex  pl-7  w-1/2'><span className='mr-6'>Username</span> <CheckIcon className='text-green-500' /> <X className='text-red-500' /> <Eye /></li>
                        <li className='flex  pl-7  w-1/2'><span className='mr-6'>Username</span> <CheckIcon className='text-green-500' /> <X className='text-red-500' /> <Eye /></li>


                    </ul>

                </div>
                <div className='row-span-1 col-span-1 mb-4 bg-gray-100 flex items-center justify-center text-[#eb7333] rounded-md shadow-md'>
                    <h2>Skills</h2>
                </div>
                <div className='row-span-1 col-span-1 mb-4 bg-gray-100 flex items-center justify-center text-[#eb7333] rounded-md shadow-md'><h2>Interests</h2></div>
            </div>

        </div >
    )
}

export default UserProfile;