type BookingsButtonProps = {
    isActive: boolean;
    onClick: () => void;
};

function BookingsButton({ isActive, onClick }: BookingsButtonProps) {
    return (
        <button className={`menu-item ${isActive ? "active" : ""}`.trim()} type="button" onClick={onClick}>
            Bookings
        </button>
    );
}

export default BookingsButton;
