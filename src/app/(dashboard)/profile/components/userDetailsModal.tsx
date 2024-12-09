import React from "react";

interface UserDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    userdetails: {
        username?: string;
        email?: string;
        bio?: string;
        interests?: string[];
        skills?: string[];
    };
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
    isOpen,
    onClose,
    userdetails,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">User Details</h2>
                <div className="space-y-2">
                    <div>
                        <span className=" font-semibold">Username:</span> {userdetails.username || "N/A"}
                    </div>
                    <div>
                        <span className="font-semibold">Email:</span> {userdetails.email || "N/A"}
                    </div>
                    <div>
                        <span className="font-semibold">Bio:</span> {userdetails.bio || "N/A"}
                    </div>
                    <div>
                        <span className="font-semibold">Interests:</span>{" "}
                        {userdetails.interests?.length > 0
                            ? userdetails.interests.join(", ")
                            : "N/A"}
                    </div>
                    <div>
                        <span className="font-semibold">Skills:</span>{" "}
                        {userdetails.skills?.length > 0 ? userdetails.skills.join(", ") : "N/A"}
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default UserDetailsModal;
