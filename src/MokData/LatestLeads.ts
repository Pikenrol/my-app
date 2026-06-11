export interface LatestLead {
    name: string;
    destination: string;
    status: string;
}

export const latestLeads: LatestLead[] = [
    { name: "Anna Petrova", destination: "Bali", status: "New" },
    { name: "Mark Lee", destination: "Japan", status: "Contacted" },
    { name: "Sofia Kim", destination: "Italy", status: "Won" },
    { name: "John Smith", destination: "Thailand", status: "New" },
];
