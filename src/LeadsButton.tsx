type LeadsButtonProps = {
    isActive: boolean;
    onClick: () => void;
};

function LeadsButton({ isActive, onClick }: LeadsButtonProps) {
    return (
        <button className={`menu-item ${isActive ? "active" : ""}`.trim()} type="button" onClick={onClick}>
            Leads
        </button>
    );
}

export default LeadsButton;
