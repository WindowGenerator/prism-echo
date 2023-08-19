use std::net::SocketAddr;

pub struct Configuration {
    pub addr: SocketAddr,
}

pub fn get_config() -> Configuration {
    let addr: SocketAddr = option_env!("BIND_ADDR")
        .unwrap_or("127.0.0.1:8080")
        .parse()
        .expect("BIND_ADDR is in worng format");
    Configuration { addr }
}
