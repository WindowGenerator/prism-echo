#![feature(decl_macro)]
#[macro_use] extern crate rocket;

use chrono::Local;
use env_logger::Builder;
use log::{info, LevelFilter};
use std::io::Write;

use std::thread;

mod chat;
mod config;
mod routes;

fn setup_log(log_level: LevelFilter) {
    Builder::new()
        .format(|buf, record| {
            writeln!(
                buf,
                "{} [{}] [{}] [{}] - {}",
                Local::now().format("%Y-%m-%dT%H:%M:%S"),
                thread::current().name().unwrap_or("-"),
                record.module_path().unwrap_or("-"),
                record.level(),
                record.args()
            )
        })
        .filter(None, log_level)
        .init();
}

fn setup_websocket(addr: String) {
    info!("Setup websocket channel");

    thread::Builder::new()
        .name("websocket-chat-thread".into())
        .spawn(|| {
            let _ = chat::websocket(addr);
        })
        .unwrap();

    info!("Websocket channel is ready");
}

fn get_rocket_app() -> rocket::Rocket {
    info!("Start setup Rocket app");

    let rocket_routes = routes![routes::manage_health,];

    rocket::ignite().mount("/", rocket_routes)
}

fn main() {
    let enviroment = config::get_enviroment().unwrap();

    setup_log(enviroment.log_level);
    setup_websocket(enviroment.websocket_addr);

    let launch_error = get_rocket_app().launch();

    info!("Launch error: '{}'", launch_error);
}
