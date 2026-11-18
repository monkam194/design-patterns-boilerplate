export interface AppConfig {
    readonly port: number;
}

function readPort(value: string | undefined): number {
    const port = Number(value ?? 3000);

    if (!Number.isInteger(port) || port < 1 || port > 65_535) {
        throw new Error("PORT must be an integer between 1 and 65535");
    }

    return port;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
    return { port: readPort(env.PORT) };
}
