import { useMemo, useState, type FormEvent } from "react";
import styles from "./LeadsPage.module.css";
import { type Lead, type LeadStatus, type NewLeadForm } from "../../../types";
import { initialLeads } from "../../../MokData/InitialLeads";

const emptyForm: NewLeadForm = {
    client: "",
    destination: "",
    budget: "",
    manager: "",
    status: "New",
};

const LeadsPage = () => {
    const [leads, setLeads] = useState<Lead[]>(initialLeads);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<"" | LeadStatus>("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [form, setForm] = useState<NewLeadForm>(emptyForm);

    const filteredLeads = useMemo(() => {
        return leads.filter((lead) => {
            const matchesSearch =
                search.trim() === "" ||
                lead.client.toLowerCase().includes(search.toLowerCase()) ||
                lead.destination.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = status === "" || lead.status === status;
            return matchesSearch && matchesStatus;
        });
    }, [leads, search, status]);

    const handleCreateLead = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!form.client.trim() || !form.destination.trim() || !form.budget.trim() || !form.manager.trim()) {
            return;
        }

        const nextId = leads.length === 0 ? 1000 : Math.max(...leads.map((lead) => lead.id)) + 1;
        const createdAt = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

        setLeads((prev) => [
            {
                id: nextId,
                client: form.client.trim(),
                destination: form.destination.trim(),
                budget: form.budget.trim(),
                manager: form.manager.trim(),
                status: form.status,
                createdAt,
            },
            ...prev,
        ]);

        setForm(emptyForm);
        setIsCreateOpen(false);
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Leads</h1>
                <button className={styles.newLeadButton} onClick={() => setIsCreateOpen((prev) => !prev)}>
                    + New Lead
                </button>
            </div>

            {isCreateOpen && (
                <form className={styles.createPanel} onSubmit={handleCreateLead}>
                    <input className={styles.control} placeholder="Client" value={form.client} onChange={(event) => setForm((prev) => ({ ...prev, client: event.target.value }))} />
                    <input className={styles.control} placeholder="Destination" value={form.destination} onChange={(event) => setForm((prev) => ({ ...prev, destination: event.target.value }))} />
                    <input className={styles.control} placeholder="Budget (example: $2,500)" value={form.budget} onChange={(event) => setForm((prev) => ({ ...prev, budget: event.target.value }))} />
                    <input className={styles.control} placeholder="Manager" value={form.manager} onChange={(event) => setForm((prev) => ({ ...prev, manager: event.target.value }))} />
                    <select className={styles.control} value={form.status} onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as LeadStatus }))}>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Won">Won</option>
                        <option value="Lost">Lost</option>
                    </select>
                    <button className={styles.saveButton} type="submit">Save Lead</button>
                </form>
            )}

            <section className={styles.filters}>
                <input
                    className={styles.control}
                    placeholder="Search leads..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <select className={styles.control} value={status} onChange={(event) => setStatus(event.target.value as "" | LeadStatus)}>
                    <option value="">Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                </select>
            </section>

            <section className={styles.panel}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Destination</th>
                            <th>Budget</th>
                            <th>Status</th>
                            <th>Manager</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeads.map((lead) => (
                            <tr key={lead.id}>
                                <td>{lead.client}</td>
                                <td>{lead.destination}</td>
                                <td>{lead.budget}</td>
                                <td><span className={`${styles.badge} ${styles[lead.status.toLowerCase()]}`}>{lead.status}</span></td>
                                <td>{lead.manager}</td>
                                <td>{lead.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default LeadsPage;