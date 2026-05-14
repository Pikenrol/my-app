type DashboardButtonProps = {
    isActive: boolean;
    onClick: () => void;
};

function DashboardButton({ isActive, onClick }: DashboardButtonProps) {
    return (
        <button className={`menu-item ${isActive ? "active" : ""}`.trim()} type="button" onClick={onClick}>
            Dashboard
        </button>
    );
}

export default DashboardButton;
