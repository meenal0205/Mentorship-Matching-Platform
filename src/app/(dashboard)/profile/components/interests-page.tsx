import React, { useEffect, useState } from 'react';

import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getUserdetails } from '@/lib/userDetails';
import { technicalInterests } from '@/lib/skill-interest-data';

const availableInterests = technicalInterests;

interface InterestsPageProps {
    interests: string[];
}

const InterestsPage = ({ interests }: InterestsPageProps) => {
    const [selectedInterest, setSelectedInterest] = useState("");
    const [updatedInterests, setUpdatedInterests] = useState<string[]>([]);

    useEffect(() => {
        setUpdatedInterests(interests);
    }, [interests]);

    // Add interest
    const handleAddInterest = async () => {
        if (selectedInterest && !updatedInterests.includes(selectedInterest)) {
            const newInterests = [...updatedInterests, selectedInterest];
            setUpdatedInterests(newInterests); // Update state
            setSelectedInterest(""); // Clear input field
            await saveDetails(newInterests); // Pass new state directly
        }
    };

    // Remove interest
    const removeInterest = async (interest: string) => {
        const newInterests = updatedInterests.filter((s) => s !== interest);
        setUpdatedInterests(newInterests); // Update state
        await saveDetails(newInterests); // Pass new state directly
    };

    // Save interests to API
    const saveDetails = async (interests: string[]) => {
        try {
            const response = await fetch(`/api/user-profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: getUserdetails()?.username,
                    interests, // Use the provided parameter
                }),
            });

            if (response.ok) {
                alert("Interest added/removed successfully.");
            } else {
                alert("Failed to save interests.");
            }
        } catch (err) {
            console.error("Error saving details:", err);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Interests</h2>

            {/* Display current interests */}
            <div className="flex flex-wrap gap-3">
                {updatedInterests.map((interest, idx) => (
                    <span
                        key={idx}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg flex items-center gap-2"
                    >
                        {interest}
                        <X
                            className="w-4 h-4 cursor-pointer text-red-500"
                            onClick={() => removeInterest(interest)}
                        />
                    </span>
                ))}
            </div>

            {/* Input and add button */}
            <div className="flex gap-3 mt-4">
                <Input
                    list="interests-list"
                    value={selectedInterest}
                    onChange={(e) => setSelectedInterest(e.target.value)}
                    placeholder="Select or type an interest"
                    className="flex-grow"
                />
                <datalist id="interests-list">
                    {availableInterests.map((interest: string, idx: number) => (
                        <option key={idx} value={interest} />
                    ))}
                </datalist>
                <Button onClick={handleAddInterest}>Add</Button>
            </div>
        </div>
    );
};

export default InterestsPage;
