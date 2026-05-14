type ToursButtonProps = {
    isActive: boolean;
    onClick: () => void;
};

function ToursButton({ isActive, onClick }: ToursButtonProps) {
    return (
        <button className={`menu-item ${isActive ? "active" : ""}`.trim()} type="button" onClick={onClick}>
            Tours
        </button>
    );
}

export default ToursButton;
