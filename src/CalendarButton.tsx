type CalendarButtonProps = {
    isActive: boolean;
    onClick: () => void;
};

function CalendarButton({ isActive, onClick }: CalendarButtonProps) {
    return (
        <button className={`menu-item ${isActive ? "active" : ""}`.trim()} type="button" onClick={onClick}>
            Calendar
        </button>
    );
}

export default CalendarButton;
