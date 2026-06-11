import SignInForm from "../../../components/SignInForm/SignInForm";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
    return (
        <div className={styles.authPage}>
            <SignInForm />
        </div>
    );
};

export default AuthPage;
