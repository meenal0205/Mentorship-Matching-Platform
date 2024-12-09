import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    bio: string;
    username: string;
    email: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, bio, username, email }) => {
    const [updatedUsername, setUsername] = useState(username);

    const [updatedBio, setBio] = useState(bio);

    useEffect(() => {
        if (isOpen) {
            setUsername(username);

            setBio(bio);
        }
    }, [isOpen, username, email, bio]);


    const saveDetails = async () => {
        try {
            const response = await fetch(`/api/user-profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: updatedUsername,
                    email: email,
                    bio: updatedBio
                })
            })

            if (response.ok) {
                onClose();
            }


        }
        catch (err) {
            console.log(err)
        }


    }





    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={updatedUsername}
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                disabled
                                required

                            />
                        </div>
                        <div>
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                placeholder="Type your message here."
                                value={updatedBio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                            onClick={saveDetails}
                            type="submit"
                        >
                            Confirm
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Modal;
