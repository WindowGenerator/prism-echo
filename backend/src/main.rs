use axum::routing::get;
use axum::Router;
use tracing::info;
use tracing_subscriber;

mod config;
mod routes;

#[tokio::main]
async fn main() {
    let config = config::get_config();
    tracing_subscriber::fmt::init();

    let app = Router::new()
        .route("/manage/health", get(routes::healthcheck))
        .route("/chat/ws", get(routes::chat));
    info!("Starting server on {}", config.addr);
    axum::Server::bind(&config.addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
