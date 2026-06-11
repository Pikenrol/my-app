import styles from "./DashboardPage.module.css";
import {stats} from "../../../MokData/States";
import {latestLeads} from "../../../MokData/LatestLeads"
import {topTours} from "../../../MokData/topTours"
import {tasks} from "../../../MokData/Tasks"



const DashboardPage = () => {
    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Dashboard</h1>

            <section className={styles.statsGrid}>
                {stats.map((item) => (
                    <article key={item.title} className={styles.statCard}>
                        <p className={styles.statTitle}>{item.title}</p>
                        <p className={styles.statValue}>{item.value}</p>
                        <p className={styles.statTrend}>{item.trend}</p>
                    </article>
                ))}
            </section>

            <section className={styles.mainGrid}>
                <article className={styles.panel}>
                    <h2 className={styles.panelTitle}>Revenue Overview</h2>
                    <div className={styles.chartBox}>
                        <svg viewBox="0 0 600 220" className={styles.chart}>
                            <polyline
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="4"
                                points="20,180 80,120 140,150 200,90 260,110 320,70 380,100 440,60 500,80 560,40"
                            />
                        </svg>
                    </div>
                </article>

                <article className={styles.panel}>
                    <h2 className={styles.panelTitle}>Latest Leads</h2>
                    <div className={styles.list}>
                        {latestLeads.map((lead) => (
                            <div key={lead.name} className={styles.listRow}>
                                <div>
                                    <p className={styles.listPrimary}>{lead.name}</p>
                                    <p className={styles.listSecondary}>{lead.destination}</p>
                                </div>
                                <span className={styles.badge}>{lead.status}</span>
                            </div>
                        ))}
                    </div>
                </article>
            </section>

            <section className={styles.bottomGrid}>
                <article className={styles.panel}>
                    <h2 className={styles.panelTitle}>Top Tours</h2>
                    <div className={styles.tourGrid}>
                        {topTours.map((tour) => (
                            <div key={tour.name} className={styles.tourCard}>
                                <p className={styles.listPrimary}>{tour.name}</p>
                                <p className={styles.listSecondary}>{tour.price}</p>
                            </div>
                        ))}
                    </div>
                </article>

                <article className={styles.panel}>
                    <h2 className={styles.panelTitle}>Task Summary</h2>
                    <div className={styles.list}>
                        {tasks.map((task) => (
                            <div key={task.label} className={styles.listRow}>
                                <p className={styles.listPrimary}>{task.label}</p>
                                <p className={styles.listPrimary}>{task.value}</p>
                            </div>
                        ))}
                    </div>
                </article>
            </section>
        </div>
    );
};

export default DashboardPage;
