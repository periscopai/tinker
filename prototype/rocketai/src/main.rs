//! rockerai
//!
//! This is a small prototype to write the Rest API in Rust.
#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use] 
extern crate rocket;
use std::sync::Mutex;

#[cfg(test)] mod tests;

mod sequencer {
    use super::*;
    use rocket::State;

    #[post("/start")]
    pub fn start(sequencer: State<Mutex<pai_gst_sequencer::PAISequencer>>) -> String {
        // Sequencer is a state containing a Mutex wrapping the sequencer object.
        // So the call below access the mutex (.inner), takes the lock (.lock),
        // unwrap the object from the Mutex and calls the start method.
        sequencer.inner().lock().unwrap().start();
        "RUNNING".to_string()
    }

    #[post("/stop")]
    pub fn stop(sequencer: State<Mutex<pai_gst_sequencer::PAISequencer>>) -> String {
        sequencer.inner().lock().unwrap().stop();
        "STOPPED".to_string()
    }

    #[get("/status")]
    pub fn status(sequencer: State<Mutex<pai_gst_sequencer::PAISequencer>>) -> String {
        let state = sequencer.inner().lock().unwrap().state();
        format!("status {}", state)
    }
}

fn main() {
    // We need to wrap the sequencer instance in a Mutex as this global
    // reference may be used by multiple Rocket worker.
    let sequencer : Mutex<pai_gst_sequencer::PAISequencer> = Mutex::new(pai_gst_sequencer::PAISequencer::new("foo"));

    let mut server = rocket::ignite();
    // We store the server as a global "state" in rocket
    server = server.manage(sequencer);
    // We setup the routes.
    server = server.mount("/sequencer", routes![sequencer::start,
                                                    sequencer::stop,
                                                    sequencer::status]);
    server.launch();
}
