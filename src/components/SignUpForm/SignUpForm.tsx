import { Button, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../Api/authApi";
import styles from "./SignUpForm.module.css";

const SignUpForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!email || !password || !fullName) {
            messageApi.warning("Заполни все поля");
            return;
        }

        try {
            setIsSubmitting(true);
            await authApi.register({ email, password, fullName });
            messageApi.success("Регистрация успешна");
            navigate("/login", { replace: true });
        } catch {
            messageApi.error("Не удалось зарегистрироваться");
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
                <p>Create your account</p>
                <div className={styles.registrationForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="fullName">Full name</label>
                        <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                        />
                    </div>
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
                        Sign Up
                    </Button>
                    <div className={styles.switchRow}>
                        <span>Уже есть аккаунт?</span>
                        <Link className={styles.switchLink} to="/login">
                            Войти
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpForm;
