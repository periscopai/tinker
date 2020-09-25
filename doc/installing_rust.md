# Installing Rust

The purpose of this page is to set up rust and vscode integration for build and debugging rust code

## Setting up Rust

Run
```shell
$ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh

Welcome to Rust!

This will download and install the official compiler for the Rust
programming language, and its package manager, Cargo.

...

The cargo, rustc, rustup and other commands will be added to
Cargo's bin directory, located at:

  /home/nhd/.cargo/bin


1) Proceed with installation (default)
2) Customize installation
3) Cancel installation

```
select option 1

After installation:

- rustup is the rust toolchain installer which allows you to update new releases, etc.
- rustc is the rust compiler
- cargo is the Rust package manager (like pip)

## Creating a simple program

```shell
$ cargo new <package name>
```
We created the first package in [rust/explore](../rust/explore) which contains 2 files

- [rust/explore/Cargo.toml](../rust/explore/Cargo.toml) which is the package manifest (very much like setup.toml)

- [../rust/explore/src/main.rs](rust/explore/src/main.rs) very similar to main.c

---

**VS Code Note**

I have installed both Rust and rust-analyzer from the marketplace.

---
