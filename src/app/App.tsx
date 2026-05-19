import { useState } from "react";
import AuthPage from "../pages/auth/AuthPage";
import DashboardPage from "../pages/dashboard/DashboardPage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    if (isLoggedIn) {
        return <DashboardPage />;
    }

    return <AuthPage onLogin={() => setIsLoggedIn(true)} />;
}

export default App;
