import { CheckIcon, Eye, X } from 'lucide-react'
import React, { useState } from 'react'
import UserDetailsModal from './userDetailsModal';

interface receivedRequestsProps {
    receivedRequests: any
}





const handleRequest = async (isAccepted: boolean, senderUsername: string, receiverUsername: string) => {
    try {
        const response = await fetch(`/api/request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isAccepted,
                senderUsername,
                receiverUsername
            }),
        });

        if (response.ok) {
            alert("Updated.");
        } else {
            alert("Failed to update.");
        }
    } catch (err) {
        console.error("Error saving details:", err);
    }

    console.log(isAccepted, senderUsername, receiverUsername)
}



const ReceivedRequests = ({ receivedRequests }: receivedRequestsProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({});


    const viewProfile = async (senderUsername: string) => {
        const response = await fetch(`/api/user-profile?username=${senderUsername}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log(data.userdetails.username);
        console.log(data.userdetails.email);
        console.log(data.userdetails.bio);
        console.log(data.userdetails.skills);
        setUserDetails(data.userdetails)
        setIsModalOpen(true)



    }
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Received Requests</h3>
            <div className="gap-6">
                <div className="bg-gray-50  rounded-lg  border-gray-200">

                    {receivedRequests.length > 0 ? (
                        receivedRequests.map((req: any, idx: number) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-3 rounded-lg border border-gray-300 bg-white shadow-sm hover:shadow-md transition-shadow text-gray-700 mb-3"
                            >
                                <p className="font-bold">{req?.senderUsername}</p>
                                <div className="flex items-center gap-3">
                                    <CheckIcon className="w-6 h-6 text-green-500 cursor-pointer hover:scale-110 transition-transform" onClick={(e) => { handleRequest(true, req?.senderUsername, req?.receiverUsername) }} />
                                    <X className="w-6 h-6 text-red-500 cursor-pointer hover:scale-110 transition-transform" onClick={(e) => { handleRequest(false, req?.senderUsername, req?.receiverUsername) }} />
                                    <Eye className="w-6 h-6 text-gray-500 cursor-pointer hover:scale-110 transition-transform" onClick={() => viewProfile(req?.senderUsername)} />



                                    <UserDetailsModal
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                        userdetails={userDetails}
                                    />

                                </div>

                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No received requests</p>
                    )}
                </div>

            </div>
        </div>
    )
}

export default ReceivedRequests