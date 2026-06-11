import { type MenuItemButtonProps } from "../../types";
import styles from "./MenuItemButton.module.css";

const MenuItemButton = ({ label, isActive, onClick }: MenuItemButtonProps) => {
    return (
        <button className={`${styles.menuItem} ${isActive ? styles.active : ""}`.trim()} type="button" onClick={onClick}>
            {label}
        </button>
    );
};

export default MenuItemButton;
