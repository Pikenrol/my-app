export interface StatItem {
    title: string;
    value: string;
    trend: string;
}
export const stats: StatItem[] = [
    { title: "Revenue", value: "$32,400", trend: "+12.5%" },
    { title: "Bookings", value: "128", trend: "+8.2%" },
    { title: "Conversion Rate", value: "26%", trend: "+4.1%" },
    { title: "Active Tours", value: "24", trend: "+3" },
];