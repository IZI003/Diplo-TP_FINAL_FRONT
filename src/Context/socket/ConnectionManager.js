import { createSocket } from "./socketConfig";

export function ConnectionManager() {
    function connect() {
        createSocket.connect();
    }

    function disconnect() {
        createSocket.disconnect();
    }

    return (
        <>
            <button onClick={connect}>Connect</button>
            <button onClick={disconnect}>Disconnect</button>
        </>
    );
}