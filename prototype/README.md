# Prototype

**Table Of Content**

- [Before we start](#before-we-start)
    - [Building the documentation](#building-the-documentation)
    - [Building the Code](#building-the-code)
    - [Running](#running)

- [Crates](#crates)
    - [lib.rs](#librs)

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

## Building the documentation

```
cd prototype/pai-gst-sequencer
cargo doc
# To view the documentation
cargo doc --open
# or
firefox target/doc/pai_gst_sequencer/index.html 
```

## Building the code

```
cd prototype/pai-gst-sequencer
cargo build
```

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

## lib.rs

- [prototype/pai-gst-sequencer/src/lib.rs](pai-gst-sequencer/src/lib.rs)

---

**Todo's**

- Figure out how to make a constructor.

---



- [AI Pipeline] 


[AI Pipeline]: ./pai-gst-sequencer
