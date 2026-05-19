type MenuItemButtonProps = {
    label: string;
    isActive: boolean;
    onClick: () => void;
};

function MenuItemButton({ label, isActive, onClick }: MenuItemButtonProps) {
    return (
        <button className={`menu-item ${isActive ? "active" : ""}`.trim()} type="button" onClick={onClick}>
            {label}
        </button>
    );
}

export default MenuItemButton;
