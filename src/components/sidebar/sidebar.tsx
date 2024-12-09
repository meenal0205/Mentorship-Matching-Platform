import { Handshake, LogOut } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {


    const links = [
        { name: "PROFILE", link: "/profile" },
        { name: "DISCOVER", link: "/discover" },
        { name: "MATCHES", link: "/matchmaking" },




    ]



    return (
        <div className="bg-primary h-full flex flex-col items-center gap-y-7 text-white py-8">

            <div className="flex flex-col items-center mb-11">
                <Handshake className="mb-4" />
                <h1 className="text-sm font-semibold ">MENTORCONNECT</h1>
            </div>


            <div className="flex flex-col gap-y-4 w-full px-4">
                {links.map((element: any) => (
                    <Link
                        key={element?.link}
                        href={element?.link}
                        className="hover:border-r-4 hover:border-white flex justify-center py-2 text-center transition-all duration-200"
                    >
                        {element?.name}
                    </Link>
                ))}
            </div>

            <div className="flex-grow"></div>


            <LogOut className="mb-4 cursor-pointer hover:opacity-80 transition-opacity duration-200" />
        </div>

    )
}

export default Sidebar