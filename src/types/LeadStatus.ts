export type LeadStatus = "New" | "Contacted" | "Won" | "Lost";

export type Lead = {
    id: number;
    client: string;
    destination: string;
    budget: string;
    status: LeadStatus;
    manager: string;
    createdAt: string;
};

export type NewLeadForm = {
    client: string;
    destination: string;
    budget: string;
    manager: string;
    status: LeadStatus;
};