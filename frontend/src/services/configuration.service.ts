import { Configuration } from "../types/configuration.type"

export const getConfiguration = (): Configuration => {
    const websocketApiUri = import.meta.env.VITE_WEBSOCKET_API_URI
    if (websocketApiUri === undefined) {
        throw new Error("VITE_WEBSOCKET_API_URI is undefined")
    }
    return {
        websocketApiUri: websocketApiUri
    } as Configuration
}
