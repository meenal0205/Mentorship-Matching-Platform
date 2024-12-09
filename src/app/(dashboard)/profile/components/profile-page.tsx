import Modal from '@/components/modal'
import { getUserdetails } from '@/lib/userDetails'
import { Edit3Icon, Trash2Icon, User2Icon } from 'lucide-react'
import React, { useState } from 'react'

interface profilePageProps {
    bio: string,
    username: string,
    email: string
}

const currentUser = getUserdetails()?.username;





const ProfilePage = ({ bio, username, email }: profilePageProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div> <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <div className="flex items-center gap-6">

                <h2 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h2>
                <div className="flex items-center gap-3 ml-auto">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2  text-gray-800 rounded-lg shadow-md hover:bg-blue-600 transition-all"
                    >
                        <Edit3Icon className="w-5 h-5" />
                    </button>


                    <button
                        className="flex items-center gap-2 px-4 py-2 text-gray-800 rounded-lg shadow-md hover:bg-red-600 transition-all"
                    >
                        <Trash2Icon className="w-5 h-5" />

                    </button>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <User2Icon className="w-16 h-16 text-gray-400" />
                <div className="flex-grow">
                    <p className="text-lg font-bold text-gray-800">{username}</p>
                    <p className="text-gray-500">{email}</p>
                    <p className="text-gray-700 mt-2">{bio}</p>
                </div>
            </div>
        </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Edit Profile"
                bio={bio}
                username={username}
                email={email}

            >

            </Modal>
        </div>
    )
}

export default ProfilePage