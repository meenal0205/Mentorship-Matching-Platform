import React from 'react'

interface sentRequestsProps {
    sentRequests: string[],

}
const textColors: any = {
    PENDING: 'text-gray-500',
    ACCEPTED: 'text-green-600',
    REJECTED: 'text-red-600',
}

const SentRequest = ({ sentRequests }: sentRequestsProps) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Sent Requests</h3>
            <div className="gap-2">
                {/* Sent Requests */}
                <div className="bg-white rounded-lg ">

                    {sentRequests.length > 0 ? (
                        sentRequests.map((req: any, idx: number) => (
                            <div
                                key={idx}
                                className={`flex justify-between   text-gray-700 hover:shadow-md transition-shadow items-center p-3 border rounded-lg mb-3 ${textColors[req?.status] || 'border-gray-300'
                                    }`}
                            >
                                <p className="text-base font-bold">
                                    {req?.receiverUsername}
                                </p>
                                <span
                                    className={`px-2 py-1 rounded-lg text-sm font-semibold ${req?.status === 'ACCEPTED'
                                        ? 'bg-green-100 text-green-700'
                                        : req?.status === 'REJECTED'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-gray-300 text-gray-600'
                                        }`}
                                >
                                    {req?.status}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No sent requests</p>
                    )}
                </div>

                {/* Received Requests */}

            </div>
        </div>
    )
}

export default SentRequest