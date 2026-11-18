// Un refus métier est retourné (ok: false), jamais levé en exception.
export type Result<GenericValue, GenericError> =
    | Success<GenericValue>
    | Failure<GenericError>;

export interface Success<GenericValue> {
    readonly ok: true;
    readonly value: GenericValue;
}

export interface Failure<GenericError> {
    readonly ok: false;
    readonly error: GenericError;
}

export function success<GenericValue>(value: GenericValue): Success<GenericValue> {
    return { ok: true, value };
}

export function failure<GenericError>(error: GenericError): Failure<GenericError> {
    return { ok: false, error };
}

export interface DomainError<GenericCode extends string> {
    readonly code: GenericCode;
    readonly message: string;
}
