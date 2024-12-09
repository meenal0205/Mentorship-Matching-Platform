import React, { ReactNode } from 'react'
import { Button } from './ui/button'


interface GoogleSignInButtonProps {
    children: ReactNode
}

const GoogleSignInButton = ({ children }: GoogleSignInButtonProps) => {

    const loginWithGoogle = () => {
        console.log("sign in with google");

    }
    return (
        <Button onClick={loginWithGoogle} className='w-full '>{children}</Button>
    )
}

export default GoogleSignInButton