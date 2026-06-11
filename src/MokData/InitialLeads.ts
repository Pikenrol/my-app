import { type  Lead } from  "../types/LeadStatus" ;

export const initialLeads: Lead[] = [
    { id: 1024, client: "Anna Petrova", destination: "Bali", budget: "$2,500", status: "New", manager: "Ivan", createdAt: "12 Jun 2024" },
    { id: 1025, client: "Mark Lee", destination: "Japan", budget: "$4,200", status: "Contacted", manager: "Olga", createdAt: "11 Jun 2024" },
    { id: 1026, client: "Sofia Kim", destination: "Italy", budget: "$1,800", status: "Won", manager: "Ivan", createdAt: "10 Jun 2024" },
    { id: 1027, client: "John Smith", destination: "Thailand", budget: "$3,100", status: "New", manager: "Olga", createdAt: "08 Jun 2024" },
    { id: 1028, client: "Emily Davis", destination: "Spain", budget: "$2,200", status: "Lost", manager: "Ivan", createdAt: "06 Jun 2024" },
];