use rocket::http::Status;

#[get("/manage/health")]
pub fn manage_health() -> Status {
    Status::Ok
}
