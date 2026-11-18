import type { Constraint } from "./base";

// Date sans heure au format YYYY-MM-DD.
export type CalendarDate = string & Constraint<"calendar-date">;

const CALENDAR_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MILLISECONDS_PER_DAY = 86_400_000;

function toUtcMidnight(date: CalendarDate): number {
    return Date.parse(`${date}T00:00:00.000Z`);
}

function fromUtcMilliseconds(milliseconds: number): CalendarDate {
    return new Date(milliseconds).toISOString().slice(0, 10) as CalendarDate;
}

export function calendarDate(input: unknown): CalendarDate | null {
    if (typeof input !== "string" || !CALENDAR_DATE_PATTERN.test(input)) {
        return null;
    }

    const milliseconds = Date.parse(`${input}T00:00:00.000Z`);

    if (Number.isNaN(milliseconds) || fromUtcMilliseconds(milliseconds) !== input) {
        return null;
    }

    return input as CalendarDate;
}

export function addDays(date: CalendarDate, days: number): CalendarDate {
    return fromUtcMilliseconds(toUtcMidnight(date) + days * MILLISECONDS_PER_DAY);
}

// Nombre de jours de from à to (to - from).
export function daysBetween(from: CalendarDate, to: CalendarDate): number {
    return Math.round((toUtcMidnight(to) - toUtcMidnight(from)) / MILLISECONDS_PER_DAY);
}
