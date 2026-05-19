import SignInForm from "../../components/SignInForm";
import "./AuthPage.css";

type AuthPageProps = {
    onLogin: () => void;
};

function AuthPage({ onLogin }: AuthPageProps) {
    return (
        <div className="auth-page">
            <SignInForm onSuccess={onLogin} />
        </div>
    );
}

export default AuthPage;
