import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { type MenuKey } from "../../utils/menuItems";
import "./DashboardPage.css";

function DashboardPage() {
    const [activeMenu, setActiveMenu] = useState<MenuKey>("Dashboard");

    return (
        <div className="dashboard-page">
            <Sidebar activeMenu={activeMenu} onChange={setActiveMenu} />
            <section className="right-content" />
        </div>
    );
}

export default DashboardPage;
