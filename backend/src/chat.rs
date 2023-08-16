use std::{env, io::Error, process::exit};

use futures_util::{future, StreamExt, TryStreamExt};
use log::{debug, error, info};
use tokio::net::{TcpListener, TcpStream};
use tokio_tungstenite::tungstenite::Message;

async fn accept_connection(stream: TcpStream) {
    let addr = match stream.peer_addr() {
        Ok(a) => a,
        Err(err) => {
            error!("Connected streams should have a peer address, err: {}", err);
            return;
        }
    };

    debug!("Peer address: {}", addr);

    let ws_stream = match tokio_tungstenite::accept_async(stream).await {
        Ok(ws_s) => ws_s,
        Err(err) => {
            error!(
                "Error during the websocket handshake occurred, err: {}",
                err
            );
            return;
        }
    };

    debug!("New WebSocket connection: {}", addr);

    let (write, read) = ws_stream.split();
    // We should not forward messages other than text.
    match read
        .try_filter(|msg| future::ready(msg.is_text()))
        .map_ok(|msg| {
            // We should add model here
            Message::Text(format!("User sent: '{}'", msg.clone()))
        })
        .forward(write)
        .await
    {
        Ok(s) => s,
        Err(err) => {
            error!("Failed to forward messages, addr: {}, err: {}", addr, err);
            return;
        }
    };

    debug!("{} was disconnected", addr);
}

#[tokio::main]
pub async fn websocket(addr: String) -> Result<(), Error> {
    let _ = env_logger::try_init();
    let addr = env::args().nth(1).unwrap_or_else(|| addr);

    // Create the event loop and TCP listener we'll accept connections on.
    let listener = match TcpListener::bind(&addr).await {
        Ok(l) => l,
        Err(err) => {
            error!("Failed to bind, err: {}", err);
            exit(1);
        }
    };
    info!("Listening on: {}", addr);

    while let Ok((stream, _)) = listener.accept().await {
        tokio::spawn(accept_connection(stream));
    }

    Ok(())
}
