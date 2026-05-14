type CustomersButtonProps = {
    isActive: boolean;
    onClick: () => void;
};

function CustomersButton({ isActive, onClick }: CustomersButtonProps) {
    return (
        <button className={`menu-item ${isActive ? "active" : ""}`.trim()} type="button" onClick={onClick}>
            Customers
        </button>
    );
}

export default CustomersButton;
