use log::LevelFilter;
use std::io::Result as IOResult;
use std::process::exit;


pub struct Enviroment {
    pub websocket_addr: String,
    pub log_level: LevelFilter,
}

pub fn get_enviroment() -> IOResult<Enviroment> {
    let websocket_host = option_env!("WEBSOCKET_ADDR").unwrap_or("127.0.0.1:8080").to_string();
    let log_level = match option_env!("LOG_LEVEL")
        .unwrap_or("info")
        .parse::<LevelFilter>() {
            Ok(log_level) => log_level,
            Err(err) => {
                println!("LOG_LEVEL Parsing error: '{}'", err);
                exit(1);
            }
        };

    Ok(Enviroment {
        websocket_addr: websocket_host,
        log_level,
    })
}
