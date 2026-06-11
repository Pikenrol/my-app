export interface Task {
    label: string;
    value: number;
}

export const tasks: Task[] = [
    { label: "Follow-ups", value: 12 },
    { label: "Pending Bookings", value: 8 },
    { label: "Upcoming Trips", value: 15 },
];