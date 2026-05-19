export type MenuKey = "Dashboard" | "Leads" | "Bookings" | "Tours" | "Customers" | "Calendar" | "Settings";

export const MENU_ITEMS: Array<{ key: MenuKey; label: string }> = [
    { key: "Dashboard", label: "Dashboard" },
    { key: "Leads", label: "Leads" },
    { key: "Bookings", label: "Bookings" },
    { key: "Tours", label: "Tours" },
    { key: "Customers", label: "Customers" },
    { key: "Calendar", label: "Calendar" },
    { key: "Settings", label: "Settings" },
];
