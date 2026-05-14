type SettingsButtonProps = {
    isActive: boolean;
    onClick: () => void;
};

function SettingsButton({ isActive, onClick }: SettingsButtonProps) {
    return (
        <button className={`menu-item ${isActive ? "active" : ""}`.trim()} type="button" onClick={onClick}>
            Settings
        </button>
    );
}

export default SettingsButton;
