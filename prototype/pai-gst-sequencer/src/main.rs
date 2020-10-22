//! Main program just to run things.
//! This obviously doesn't do anything meaning full
//!

/// We use the object which is in the same crate.
/// If we had defined an additional module, we would have added
/// the module name in the use statement
//use pai_gst_sequencer::PAISequencer;
use std::{thread, time};
use clap::{App, Arg};
use pai_gst_sequencer::*;

const GST_INPUT:&str = "test-source";
const GST_OUTPUT:&str = "display";

/// This is the main function
fn main() {
    let matches = App::new("pai-gst-sequencer")
        .version("1.0.0.dev1")
        .author("Laurent Brack <laurent.brack@gmail.com>")
        .about("harness to work with the AI squenecer")
        .arg(
            Arg::with_name("input")
                .short("i")
                .long("input")
                .required(false)
                .value_name("INPUT")
                // TODO: format! returns a std::string whereas help take str - fixed it using &. Don't know why
                .help(&format!("sequencer input - see documentation for valid values - defaults to '{}'", GST_INPUT))
                .takes_value(true),
        )
        .arg(
            Arg::with_name("output")
                .short("o")
                .long("output")
                .required(false)
                .value_name("OUTPUT")
                .help(&format!("sequencer output - see documentation for valid values - defaults to '{}'", GST_OUTPUT))
                .takes_value(true),
        )
        .get_matches();

    let input = matches.value_of("input").unwrap_or(GST_INPUT);
    let output = matches.value_of("input").unwrap_or(GST_OUTPUT);

    println!("creating AI sequencer with input '{}' and '{}'", input, output);

    // We define the sequencer as mutable otherwise methods would
    // not be able to modify its attributes
    let mut sequencer = PAISequencer::new(&input);

    println!("sequencer state '{:?}'", sequencer.state());
    println!("starting the sequencer");
    let state = sequencer.start();
    println!("state returned {:?}", state);
    assert!(matches!(sequencer.state(), PAISequencerState::RUNNING));

    println!("sleeping for 5 seconds");
    thread::sleep(time::Duration::from_millis(5000));

    // This is interesting
    // The following would generate a compilation error rustc(E0502)
    // println!("state returned {:?}=={:?}", state, sequencer.state());
    // But if we left state go out of scope (not using it after the previous
    // statement), the sequencer regained the borrowed ownership.
    println!("internal state {:?}", sequencer.state());
    println!("stopping the sequencer");
    println!("sequencer state '{:?}'", sequencer.stop());
    // Here I have no idea why this works. Basically you can not do something like
    // assert!(sequencer.state() ==  PAISequencerState::STOPPED);
    // The compiler gives you an error. I found the solution below in stackoverflow
    // but don't understand it
    assert!(matches!(sequencer.state(), PAISequencerState::STOPPED));
    println!("This is the end of the pathetic piece of code.")
}

// Reference: https://doc.rust-lang.org/book/ch07-05-separating-modules-into-different-files.html
#[cfg(test)]
mod tests;
