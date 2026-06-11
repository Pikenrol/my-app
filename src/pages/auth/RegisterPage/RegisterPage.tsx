import SignUpForm from "../../../components/SignUpForm/SignUpForm";
import styles from "../AuthPage/AuthPage.module.css";

const RegisterPage = () => {
    return (
        <div className={styles.authPage}>
            <SignUpForm />
        </div>
    );
};

export default RegisterPage;
