import { Button, Input } from "antd";
import { useEffect, useState } from "react";

interface User {
    email: string;
    password: string;
    role: string;
}

interface RegistrationWindowProps {
    onLogin: () => void;
}

function RegistrationWindow({ onLogin }: RegistrationWindowProps) {
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const [users, setUsers] = useState<User[]>([])
    const [isUsersLoading, setIsUsersLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3001/users?_page=1&_per_page=5')
                const result = await response.json()
                setUsers(result.data)
            } catch {
                setUsers([])
                alert('Failed to load users. Please run local server.')
            }

            setIsUsersLoading(false)
        }

        fetchUsers()
    }, [])

    const handleSubmit = () => {
        if (isUsersLoading) {
            alert('Users are still loading')
            return
        }
        if (!users.length) {
            alert('Users were not loaded. Start server with npm run server and try again.')
            return
        }
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            onLogin()
        } else {
            alert('Invalid credentials');
        }
    }
    return (
        <div className="registration-window">
            <div className="registration-logo">
                <img className="registration-logo-icon" src="/images.jfif" alt="Travel logo" />
            </div>
            <h1>TravelOps CRM</h1>
            <p>Sign in to your account</p>
            <div className="registration-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                     />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input.Password 
                    id="password" 
                    name="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button type="primary" 
                onClick={handleSubmit} 
                size="large">Sign In</Button>
            </div>
        </div>
    )
}

export default RegistrationWindow