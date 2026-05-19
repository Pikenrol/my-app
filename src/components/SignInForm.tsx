import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { loadUsers, type User } from "../api/loadUsers";
import "./SignInForm.css";

type SignInFormProps = {
    onSuccess: () => void;
};

function SignInForm({ onSuccess }: SignInFormProps) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);
    const [isUsersLoading, setIsUsersLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const loadedUsers = await loadUsers();
                setUsers(loadedUsers);
            } catch {
                setUsers([]);
                alert("Failed to load users. Please run local server.");
            }
            setIsUsersLoading(false);
        };

        fetchUsers();
    }, []);

    const handleSubmit = async () => {
        if (isUsersLoading) {
            alert("Users are still loading");
            return;
        }

        let currentUsers = users;

        if (!currentUsers.length) {
            try {
                currentUsers = await loadUsers();
                setUsers(currentUsers);
            } catch {
                alert("Users were not loaded. Start server with npm run server and try again.");
                return;
            }
        }

        const user = currentUsers.find((item) => item.email === email && item.password === password);

        if (user) {
            onSuccess();
            return;
        }

        alert("Invalid credentials");
    };

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
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input.Password
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <Button type="primary" onClick={handleSubmit} size="large">
                    Sign In
                </Button>
            </div>
        </div>
    );
}

export default SignInForm;
