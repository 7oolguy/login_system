import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";
import UserInfoButton from "../components/UserInfoButton";

export default function ProtectedPage() {
    const [ user, setUser ] = useState(null)

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:4000/users/me', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                setUser(data)
            } catch (error) {
                console.log('Error fetching user info:', error)
            }
        }
        fetchUserInfo()
    }, [])

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div className="page">
            <div className="card">
               <h1 className="title">Perfil Info</h1>
                <p className="info"><strong>Email:</strong> {user.email}</p>     
            </div>
            <LogoutButton />
            <UserInfoButton />
        </div>
    );
}
