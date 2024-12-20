'use client'
import React from 'react'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { useRouter } from 'next/navigation';



const FormSchema = z.object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password required').min(8, 'Password must have more than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
    role: z.enum(["MENTEE", "MENTOR"])
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match' // Message should be a string, not an array
});

const SignUpForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
            username: '',
            confirmPassword: ''

        },
    })

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password,
                role: values.role
            })
        })

        if (response.ok) {
            router.push('/sign-in');
        }
        else {
            console.log(response)
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className='space-y-2'>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="johndoe"  {...field} className='mb-1' />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="mail@example.com"  {...field} className='mb-1' />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        className="border-gray-600 text-gray-700 rounded-md p-1.5 border-[1px] w-full"
                                    >
                                        <option value="">Select Role</option>
                                        <option value="MENTEE">Mentee</option>
                                        <option value="MENTOR">Mentor</option>
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Enter your password" {...field} className='mb-1' />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Re-Enter your Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Re-enter your password" {...field} className='mb-1' />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className="w-full mt-6">Sign up</Button>
            </form>

            <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                or
            </div>

            <GoogleSignInButton > Sign up with Google </GoogleSignInButton>

            <p className='text-center text-sm text-gray-600 mt-2'>Already have an account, please&nbsp;
                <Link href="/sign-in" className='text-blue-400 hover:underline'>Sign in</Link>  </p>
        </Form>
    )
}

export default SignUpForm