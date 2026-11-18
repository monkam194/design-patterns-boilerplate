import { createApp } from "./app";
import { loadConfig } from "./config";

const { port } = loadConfig();
const server = createApp().listen(port, () => {
    console.log(`HTTP server listening on port ${port}`);
});

function shutdown(signal: string): void {
    console.log(`${signal} received, shutting down`);

    server.close((error) => {
        if (error !== undefined) {
            console.error("Failed to close HTTP server", error);
            process.exitCode = 1;
        }
    });
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
