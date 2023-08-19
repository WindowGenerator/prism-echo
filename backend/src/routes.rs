use axum::{
    extract::{ws::WebSocket, WebSocketUpgrade},
    http::StatusCode,
    response::Response,
};
use tracing::{debug, error, info};

pub async fn healthcheck() -> StatusCode {
    StatusCode::OK
}

pub async fn chat(ws: WebSocketUpgrade) -> Response {
    ws.on_failed_upgrade(|e| error!("Failed to upgrade ws: {e}"))
        .on_upgrade(handle_socket)
}

async fn handle_socket(mut socket: WebSocket) {
    while let Some(msg) = socket.recv().await {
        let msg = if let Ok(msg) = msg {
            msg
        } else {
            debug!("user disconected!");
            return;
        };
        info!("User send {msg:?}");
        if socket.send(msg).await.is_err() {
            debug!("user disconected!");
            return;
        }
    }
}
