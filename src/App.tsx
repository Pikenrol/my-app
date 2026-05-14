import { useState } from "react";
import RegistrationWindow from "./RegistrationWindow";
import SecondPage from "./SecondPage";
import DashboardButton from "./DashboardButton";
import LeadsButton from "./LeadsButton";
import BookingsButton from "./BookingsButton";
import ToursButton from "./ToursButton";
import CustomersButton from "./CustomersButton";
import CalendarButton from "./CalendarButton";
import SettingsButton from "./SettingsButton";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    if (isLoggedIn) {
        return (
            <SecondPage
                DashboardButton={DashboardButton}
                LeadsButton={LeadsButton}
                BookingsButton={BookingsButton}
                ToursButton={ToursButton}
                CustomersButton={CustomersButton}
                CalendarButton={CalendarButton}
                SettingsButton={SettingsButton}
            />
        );
    }

    return (
        <div className="App">
            <RegistrationWindow onLogin={() => setIsLoggedIn(true)} />
        </div>
    );
}

export default App;
