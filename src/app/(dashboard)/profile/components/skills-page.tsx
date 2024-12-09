import React, { useEffect, useState } from 'react';
import { skilldata } from '@/lib/skill-interest-data';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getUserdetails } from '@/lib/userDetails';

const availableSkills = skilldata;

interface SkillsPageProps {
    skills: string[];
}

const SkillsPage = ({ skills }: SkillsPageProps) => {
    const [selectedSkill, setSelectedSkill] = useState("");
    const [updatedSkills, setUpdatedSkills] = useState<string[]>([]);

    useEffect(() => {
        setUpdatedSkills(skills);
    }, [skills]);

    const handleAddSkill = async () => {
        if (selectedSkill && !updatedSkills.includes(selectedSkill)) {
            const newSkills = [...updatedSkills, selectedSkill];
            setUpdatedSkills(newSkills);
            setSelectedSkill("");
            await saveDetails(newSkills);
        }
    };

    const removeSkill = async (skill: string) => {
        const newSkills = updatedSkills.filter((s) => s !== skill);
        setUpdatedSkills(newSkills);
        await saveDetails(newSkills);
    };

    const saveDetails = async (skills: string[]) => {
        try {
            const response = await fetch(`/api/user-profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: getUserdetails()?.username,
                    skills,
                }),
            });

            if (response.ok) {
                alert("Skill added/removed successfully.");
            } else {
                alert("Failed to save skills.");
            }
        } catch (err) {
            console.error("Error saving details:", err);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>


            <div className="flex flex-wrap gap-3">
                {updatedSkills.map((skill, idx) => (
                    <span
                        key={idx}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg flex items-center gap-2"
                    >
                        {skill}
                        <X
                            className="w-4 h-4 cursor-pointer text-red-500"
                            onClick={() => removeSkill(skill)}
                        />
                    </span>
                ))}
            </div>


            <div className="flex gap-3 mt-4">
                <Input
                    list="skills-list"
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    placeholder="Select or type a skill"
                    className="flex-grow"
                />
                <datalist id="skills-list">
                    {availableSkills.map((skill: string, idx: number) => (
                        <option key={idx} value={skill} />
                    ))}
                </datalist>
                <Button onClick={handleAddSkill}>Add</Button>
            </div>
        </div>
    );
};

export default SkillsPage;
