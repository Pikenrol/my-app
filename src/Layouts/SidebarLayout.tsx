import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./SidebarLayout.module.css";

const SidebarLayout = () => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <section className={styles.main}>
                <div className={styles.content}>
                    <Outlet />
                </div>
            </section>
        </div>
    );
};

export default SidebarLayout;
