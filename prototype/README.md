# Prototype

**Table Of Content**

- [Before we start](#before-we-start)
    - [Building the documentation](#building-the-documentation)
    - [Building the Code](#building-the-code)
    - [Testing](#testing)
    - [Running](#running)

- [Crates](#crates)
    - [lib.rs](#librs)

- [API Documentation](https://periscopai.github.io/tinker/pai_gst_sequencer/index.html)
- Devpi Index: https://m.devpi.net/periscopai/dev


The goal of this prototype is to build the software stack vertically 
to ensure that all layers can be integrated.

```

        +--------------------------+
        |  Rest API     - Python   |
        +--------------------------+
                    |
                    V
        +--------------------------+
        |  Engine       - Python   |
        +--------------------------+
                    |  
                    V
    #=================================#
    #         pai-gst-sequencer       #
    #   +--------------------------+  #
    #   |   AI Sequencer - Rust    |  #
    #   +--------------------------+  #
    #               |                 #
    #               V                 #
    #   +--------------------------+  #
    #   |  AI GST Pipeline  - C    |  #
    #   +--------------------------+  #
    #                                 #
    #=================================#


```

# Before we start

Things will be moving pretty fast as we make progress so keep an eye on the documentation.

Make sure to install the dependencies account to the [gstreamer version found on crates.io](https://crates.io/crates/gstreamer#installation-linux)

Also, I recomment that you clone the [gstreamer-rs project](https://github.com/sdroege/gstreamer-rs.git)

```shell
$ gh repo clone sdroege/gstreamer-rs
or 
$ git clone https://github.com/sdroege/gstreamer-rs.git
```
As it contains a few examples we can inspire ourselves from. 


## Building the documentation

```shell
cd prototype/pai-gst-sequencer
cargo doc
# To view the documentation
cargo doc --open
# or
firefox target/doc/pai_gst_sequencer/index.html 
```

## Building the code

```shell
cd prototype/pai-gst-sequencer
cargo build
```

## Testing

I haven't quite figure out how to write tests. To run them however, type

```shell
:pai-gst-sequencer|proto/structure⚡ ⇒  cargo test      
   Compiling pai-gst-sequencer v0.1.0 (/home/laurent/periscopai/tinker/prototype/pai-gst-sequencer)
    Finished test [unoptimized + debuginfo] target(s) in 0.18s
     Running target/debug/deps/pai_gst_sequencer-0dd1e86d0dee26aa

running 1 test
test tests::it_works ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out

     Running target/debug/deps/pai_gst_sequencer-e06ef441e97943fa

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out

   Doc-tests pai-gst-sequencer

running 1 test
test src/lib.rs - PAISequencerState (line 43) ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

If will automatically run the doctest, that is try to execute the code specified
in a markdown code section. If not specified, it assumes **Rust**. So if you don't 
want to run say an ascii graphic and get an error make sure to mark it as ``text``

check [prototype/pai-gst-sequencer/src/lib.rs](pai-gst-sequencer/src/lib.rs#10) for
an example.

Therefore you need to make sure the examples can run, for instance, this would fail

```rust
println!("sequencer state '{:?}'",sequencer.get_state());
```
whereas this would work
```rust
use pai_gst_sequencer::*;
let mut sequencer = PAISequencer::new("video");
println!("sequencer state '{:?}'",sequencer.get_state());
```
but if you want to hide the first to line from the final documentation
```rust
# use pai_gst_sequencer::*;
# let mut sequencer = PAISequencer::new("video");
println!("sequencer state '{:?}'",sequencer.get_state());
```
The statement preceeded with ``# `` will run but be hidden from the final 
documentation. 



## Running 

```
cd prototype/pai-gst-sequencer
cargo run
```



## Documenting the code

Check the [Rust Documentation section](../doc/rust_primer.md#Documenting-the-code)

# Python Extensions

We want to create an extension providing access from Python to ``


- [Writing a Python module with Rust](https://mycognosist.github.io/tutorial-rust-python-lib.html)

# Crates

---

**Tip**
Remember a crate in Rust is the same as a python module, that it a file in a 
package which contains a *cargo.toml* instead of an *__init__.py*

---


- [prototype/pai-gst-sequencer/src/lib.rs](pai-gst-sequencer/src/lib.rs)
  This is the library which can be access via ``use pai_gst_sequencer::*``

- [prototype/pai-gst-sequencer/src/main.rs](pai-gst-sequencer/src/main.rs)
  this is the binary crate. Basically when building the crate, it will also create 
  a binary which can be executed. 

---

**Todo's**

- Figure out how to make a constructor.
- Understand how an assertion on enum is so convoluted (see the main.rs file)
- figure out how to write some test

---



- [AI Pipeline] 


[AI Pipeline]: ./pai-gst-sequencer
