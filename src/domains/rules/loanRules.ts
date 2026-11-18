import {
    addDays,
    daysBetween,
    type CalendarDate,
    type NonNegativeInteger,
} from "../constraints";

export const MAX_ACTIVE_LOANS_PER_MEMBER = 3;

export const LOAN_DURATION_IN_DAYS = 14;

// Vrai si l'adhérent a moins de 3 emprunts en cours.
export function canStartNewLoan(activeLoansCount: number): boolean {
    return activeLoansCount < MAX_ACTIVE_LOANS_PER_MEMBER;
}

export function computeDueDate(borrowedOn: CalendarDate): CalendarDate {
    return addDays(borrowedOn, LOAN_DURATION_IN_DAYS);
}

// Jours de retard, 0 si rendu avant ou le jour de dueOn.
export function computeLateDays(dueOn: CalendarDate, returnedOn: CalendarDate): NonNegativeInteger {
    return Math.max(0, daysBetween(dueOn, returnedOn)) as NonNegativeInteger;
}
