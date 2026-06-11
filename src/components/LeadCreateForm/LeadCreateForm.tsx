import { type FormEvent } from "react";
import { type LeadStatus, type NewLeadForm } from "../../types";
import styles from "./LeadCreateForm.module.css";

interface Props {
    form: NewLeadForm;
    onChange: (name: string, value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const LeadCreateForm = ({ form, onChange, onSubmit }: Props) => {
    return (
        <form className={styles.createPanel} onSubmit={onSubmit}>
            <input className={styles.control} placeholder="Client" value={form.client} onChange={(e) => onChange("client", e.target.value)} />
            <input className={styles.control} placeholder="Destination" value={form.destination} onChange={(e) => onChange("destination", e.target.value)} />
            <input className={styles.control} placeholder="Budget (example: $2,500)" value={form.budget} onChange={(e) => onChange("budget", e.target.value)} />
            <input className={styles.control} placeholder="Manager" value={form.manager} onChange={(e) => onChange("manager", e.target.value)} />
            <select className={styles.control} value={form.status} onChange={(e) => onChange("status", e.target.value as LeadStatus)}>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
            </select>
            <button className={styles.saveButton} type="submit">Save Lead</button>
        </form>
    );
};

export default LeadCreateForm;