import MenuItemButton from "./MenuItemButton";
import { MENU_ITEMS, type MenuKey } from "../utils/menuItems";

type SidebarProps = {
    activeMenu: MenuKey;
    onChange: (key: MenuKey) => void;
};

function Sidebar({ activeMenu, onChange }: SidebarProps) {
    return (
        <aside className="left-sidebar">
            <div className="sidebar-brand">
                <span className="brand-dot" />
                <span>TravelOps CRM</span>
            </div>
            <nav className="sidebar-menu">
                {MENU_ITEMS.map((item) => (
                    <MenuItemButton
                        key={item.key}
                        label={item.label}
                        isActive={activeMenu === item.key}
                        onClick={() => onChange(item.key)}
                    />
                ))}
            </nav>
            <div className="sidebar-user">
                <strong>Manager</strong>
                <span>manager@travel.com</span>
            </div>
        </aside>
    );
}

export default Sidebar;
