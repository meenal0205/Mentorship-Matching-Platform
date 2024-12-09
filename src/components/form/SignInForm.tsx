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
import { setUser } from '@/lib/userDetails';




const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password required').min(8, 'Password must have more than 8 characters'),

})


const SignInForm = () => {
    const router = useRouter()


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    })

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const response = await fetch('/api/loguser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password
            })
        })
        if (response.ok) {
            setUser(values.email)

            router.push('/profile');
        }
        else {
            alert('Wrong username/password.')
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className='space-y-2'>
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
                </div>
                <Button className="w-full mt-6">Sign In</Button>
            </form>

            <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                or
            </div>
            <GoogleSignInButton > Sign in with Google </GoogleSignInButton>


            <p className='text-center text-sm text-gray-600 mt-2'>If you dont&apos;t have an account, please&nbsp;
                <Link href="/sign-up" className='text-blue-400 hover:underline'>Sign up</Link>  </p>
        </Form>
    )
}

export default SignInForm