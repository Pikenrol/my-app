import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer, type SlotInfo } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ru } from "date-fns/locale";
import styles from "./CalendarPage.module.css";
import { API_ENDPOINTS } from "../../../Lib/api";

type CalendarEvent = {
    id: number;
    title: string;
    start: Date;
    end: Date;
};

type CalendarEventRecord = {
    id: number;
    title: string;
    start: string;
    end: string;
};

const locales = {
    ru,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

const API_URL = API_ENDPOINTS.calendarEvents;

const toEvent = (record: CalendarEventRecord): CalendarEvent => ({
    id: record.id,
    title: record.title,
    start: new Date(record.start),
    end: new Date(record.end),
});

const toRecord = (event: Omit<CalendarEvent, "id">): Omit<CalendarEventRecord, "id"> => ({
    title: event.title,
    start: event.start.toISOString(),
    end: event.end.toISOString(),
});

const CalendarPage = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const messages = useMemo(
        () => ({
            today: "Сегодня",
            previous: "Назад",
            next: "Вперед",
            month: "Месяц",
            week: "Неделя",
            day: "День",
            agenda: "Список",
            date: "Дата",
            time: "Время",
            event: "Событие",
            noEventsInRange: "Нет событий в этом диапазоне",
            showMore: (total: number) => `+ еще ${total}`,
        }),
        []
    );

    const loadEvents = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error("Не удалось загрузить события");
            }

            const data = (await response.json()) as CalendarEventRecord[];
            setEvents(data.map(toEvent));
        } catch {
            setError("Не удалось загрузить события. Убедись, что json-server запущен на порту 3001.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadEvents();
    }, [loadEvents]);

    const handleSelectSlot = async (slotInfo: SlotInfo) => {
        const title = window.prompt("Название события:");
        if (!title) {
            return;
        }

        const payload = toRecord({
            title,
            start: new Date(slotInfo.start),
            end: new Date(slotInfo.end),
        });

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Не удалось создать событие");
            }

            const created = (await response.json()) as CalendarEventRecord;
            setEvents((prev) => [...prev, toEvent(created)]);
        } catch {
            setError("Не удалось создать событие");
        }
    };

    const handleSelectEvent = async (event: CalendarEvent) => {
        const action = window.prompt('Введите "e" для редактирования или "d" для удаления:');
        if (!action) {
            return;
        }

        if (action.toLowerCase() === "d") {
            const shouldDelete = window.confirm(`Удалить событие "${event.title}"?`);
            if (!shouldDelete) {
                return;
            }

            try {
                const response = await fetch(`${API_URL}/${event.id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("Не удалось удалить событие");
                }

                setEvents((prev) => prev.filter((item) => item.id !== event.id));
            } catch {
                setError("Не удалось удалить событие");
            }

            return;
        }

        if (action.toLowerCase() === "e") {
            const nextTitle = window.prompt("Новое название события:", event.title);
            if (!nextTitle) {
                return;
            }

            try {
                const response = await fetch(`${API_URL}/${event.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title: nextTitle }),
                });

                if (!response.ok) {
                    throw new Error("Не удалось обновить событие");
                }

                const updated = (await response.json()) as CalendarEventRecord;
                setEvents((prev) => prev.map((item) => (item.id === updated.id ? toEvent(updated) : item)));
            } catch {
                setError("Не удалось обновить событие");
            }
        }
    };

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Календарь</h1>
            {isLoading && <p className={styles.statusText}>Загрузка событий...</p>}
            {error && <p className={styles.statusText}>{error}</p>}
            <div className={styles.calendarWrapper}>
                <Calendar<CalendarEvent>
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    popup
                    messages={messages}
                    onSelectSlot={(slot) => {
                        void handleSelectSlot(slot);
                    }}
                    onSelectEvent={(selectedEvent) => {
                        void handleSelectEvent(selectedEvent);
                    }}
                    defaultView="month"
                    views={["month", "week", "day", "agenda"]}
                />
            </div>
        </div>
    );
};

export default CalendarPage;
