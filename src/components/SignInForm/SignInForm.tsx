import { Button, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/hooks/useAuth";
import styles from "./SignInForm.module.css";

const SignInForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const handleSubmit = async () => {
        if (!email || !password) {
            messageApi.warning("Введите email и password");
            return;
        }

        try {
            setIsSubmitting(true);
            await signIn(email, password);
            messageApi.success("Успешный вход");
            navigate("/app/dashboard", { replace: true });
        } catch {
            messageApi.error("Неверный email или password");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <>
            {contextHolder}
            <div className={styles.registrationWindow}>
                <div className={styles.registrationLogo}>
                    <img className={styles.registrationLogoIcon} src="/images.jfif" alt="Travel logo" />
                </div>
                <h1>TravelOps CRM</h1>
                <p>Sign in to your account</p>
                <div className={styles.registrationForm}>
                    <div className={styles.formGroup}>
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
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <Input.Password
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <Button className={styles.submitButton} type="primary" onClick={handleSubmit} size="large" loading={isSubmitting}>
                        Sign In
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SignInForm;
