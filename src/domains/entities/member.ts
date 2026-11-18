import type { CalendarDate, Email, Identifier, PersonName } from "../constraints";

export type MemberId = Identifier<"member">;

// Adhérent. L'email est unique.
export interface Member {
    readonly id: MemberId;
    readonly lastName: PersonName;
    readonly firstName: PersonName;
    readonly email: Email;
    readonly registeredOn: CalendarDate;
}
