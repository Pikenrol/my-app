import { NavLink } from "react-router-dom";
import { MENU_ITEMS } from "../../utils/menuItems";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
    return (
        <aside className={styles.leftSidebar}>
            <div className={styles.sidebarBrand}>
                <span className={styles.brandDot} />
                <span>TravelOps CRM</span>
            </div>
            <nav className={styles.sidebarMenu}>
                {MENU_ITEMS.map((item) => (
                    <NavLink
                        key={item.key}
                        to={item.path}
                        className={({ isActive }) => `${styles.menuItemLink} ${isActive ? styles.activeLink : ""}`.trim()}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
            <div className={styles.sidebarUser}>
                <strong>Manager</strong>
                <span>manager@travel.com</span>
            </div>
        </aside>
    );
};

export default Sidebar;
