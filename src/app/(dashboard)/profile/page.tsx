'use client'

import { getUserdetails } from '@/lib/userDetails'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { skilldata } from '@/lib/skill-interest-data'
import ProfilePage from './components/profile-page'
import SentRequest from './components/sent-requests'
import ReceivedRequests from './components/received-requests'
import SkillsPage from './components/skills-page'
import InterestsPage from './components/interests-page'

const UserProfile = () => {
    enum Role {
        MENTOR = 'MENTOR',
        MENTEE = 'MENTEE',
    }

    const availableSkills = skilldata
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState<Role>(Role.MENTEE)
    const [bio, setBio] = useState("")
    const [skills, setSkills] = useState([]);
    const [interests, setInterests] = useState<string[]>([])
    const [sentRequests, setSentRequests] = useState([])
    const [receivedRequests, setReceivedRequests] = useState([])


    const removeInterest = (index: number) => {
        setInterests((prevInterests) => prevInterests.filter((_, i) => i !== index))
    }



    useEffect(() => {
        const fetchProfileData = async (userEmail: string) => {
            const response = await fetch(`/api/profile?email=${userEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                const data = await response.json()
                setUsername(data.user.username)
                setEmail(data.user.email)
                setBio(data.user.bio)
                setSkills(data.user.skills)
                setInterests(data.user.interests)
                setRole(data.user.role)
            }
        }

        const fetchRequests = async (userEmail: string) => {
            const response = await fetch(`/api/request?email=${userEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()
            setSentRequests(data.data.sent)
            setReceivedRequests(data.data.received)
        }

        const userEmail = getUserdetails()?.username
        if (userEmail) {
            fetchProfileData(userEmail)
            fetchRequests(userEmail)
        }
    }, [])

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
                <ProfilePage username={username} bio={bio} email={email} />
                <SentRequest sentRequests={sentRequests} />
                <ReceivedRequests receivedRequests={receivedRequests} />
                <SkillsPage skills={skills} />
                <InterestsPage interests={interests} />
            </div>

        </div >
    )
}

export default UserProfile
