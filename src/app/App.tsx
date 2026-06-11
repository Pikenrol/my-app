import { Navigate, Route, Routes } from "react-router-dom";
import SidebarLayout from "../Layouts/SidebarLayout";
import DashboardPage from "../pages/dashboard/DashboardPage/DashboardPage";
import AuthPage from "../pages/auth/AuthPage/AuthPage";
import ProtectedRoute from "../Routes/ProtectedRoute";
import LeadsPage from "../pages/leads/LeadsPage/LeadsPage";
import BookingsPage from "../pages/bookings/BookingsPage/BookingsPage";
import ToursPage from "../pages/tours/ToursPage/ToursPage";
import CustomersPage from "../pages/customers/CustomersPage/CustomersPage";
import CalendarPage from "../pages/calendar/CalendarPage/CalendarPage";
import SettingsPage from "../pages/settings/SettingsPage/SettingsPage";
import NotFoundPage from "../pages/notFound/NotFoundPage";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route
                path="/app"
                element={
                    <ProtectedRoute>
                        <SidebarLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="leads" element={<LeadsPage />} />
                <Route path="bookings" element={<BookingsPage />} />
                <Route path="tours" element={<ToursPage />} />
                <Route path="customers" element={<CustomersPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default App;
