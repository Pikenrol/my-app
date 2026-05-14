import { useState, type ComponentType } from "react";
import "./SecondPage.css";

type MenuKey = "Dashboard" | "Leads" | "Bookings" | "Tours" | "Customers" | "Calendar" | "Settings";

type MenuButtonProps = {
    isActive: boolean;
    onClick: () => void;
};

type MenuButtonComponent = ComponentType<MenuButtonProps>;

type SecondPageProps = {
    DashboardButton: MenuButtonComponent;
    LeadsButton: MenuButtonComponent;
    BookingsButton: MenuButtonComponent;
    ToursButton: MenuButtonComponent;
    CustomersButton: MenuButtonComponent;
    CalendarButton: MenuButtonComponent;
    SettingsButton: MenuButtonComponent;
};

function SecondPage({
    DashboardButton,
    LeadsButton,
    BookingsButton,
    ToursButton,
    CustomersButton,
    CalendarButton,
    SettingsButton,
}: SecondPageProps) {
    const [activeMenu, setActiveMenu] = useState<MenuKey>("Dashboard");

    return (
        <div className="App second-page">
            <aside className="left-sidebar">
                <div className="sidebar-brand">
                    <span className="brand-dot" />
                    <span>TravelOps CRM</span>
                </div>
                <nav className="sidebar-menu">
                    <DashboardButton isActive={activeMenu === "Dashboard"} onClick={() => setActiveMenu("Dashboard")} />
                    <LeadsButton isActive={activeMenu === "Leads"} onClick={() => setActiveMenu("Leads")} />
                    <BookingsButton isActive={activeMenu === "Bookings"} onClick={() => setActiveMenu("Bookings")} />
                    <ToursButton isActive={activeMenu === "Tours"} onClick={() => setActiveMenu("Tours")} />
                    <CustomersButton isActive={activeMenu === "Customers"} onClick={() => setActiveMenu("Customers")} />
                    <CalendarButton isActive={activeMenu === "Calendar"} onClick={() => setActiveMenu("Calendar")} />
                    <SettingsButton isActive={activeMenu === "Settings"} onClick={() => setActiveMenu("Settings")} />
                </nav>
                <div className="sidebar-user">
                    <strong>Manager</strong>
                    <span>manager@travel.com</span>
                </div>
            </aside>
            <section className="right-content" />
        </div>
    );
}

export default SecondPage;
