import type { CalendarDate } from "../constraints";

export const LIBRARY_TIME_ZONE = "Europe/Paris";

// Donne la date du jour.
export interface Clock {
    readonly timeZone: typeof LIBRARY_TIME_ZONE;
    today(): CalendarDate;
}
