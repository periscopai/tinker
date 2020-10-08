# Rust Primer

This chapter is by no means a replacement for 
[the Rust Programming Language](https://doc.rust-lang.org/book/) book
but is intended to give you the 5 (or mayb 10) minute dog an pony show. 
Since it assumes that we all know Python, I will try to make parallels 
whenever possible.

Like in C, stattements must terminated by a semicolon (*;*). and comments are the C++ style
``//``

- To install rust, check the [installation](../procedures/4_rust/installation.md) instructions.
- This project comes will the vscode configuration files in [.vscode](../vscode) but 
requires some extensions to be installed. Find instructions [here](../procedures/5_vscode/rust-setup.md)

# Table Of Content

- [Rust Primer](#rust-primer)
- [Table Of Content](#table-of-content)
- [Crate.io](#crateio)
- [Data Structures](#data-structures)
  - [Variables](#variables)
  - [Constants](#constants)
  - [Data Types](#data-types)
  - [Tuples and Arrays](#tuples-and-arrays)
- [Functions](#functions)
- [Control Flow](#control-flow)
  - [if/else](#ifelse)
  - [loop](#loop)
  - [while](#while)
  - [for](#for)
- [Memory Management and Ownership](#memory-management-and-ownership)
  - [Ownership](#ownership)
  - [References](#references)
  - [Slices](#slices)
- [Structures](#structures)
  - [Methods](#methods)
    - [Associated Functions](#associated-functions)

# Crate.io

[crate.io](https://crates.io/) is to Rust what [Pypi](http://pypi.org) is
to Python. **crate.io** contains about 50,000 crates or packages and 
has seen about 4 Billions download. For example the [pyo3](https://crates.io/crates/pyo3)
crate allowing you to write native rust bindings to python on embbed 
python into a Rust application.

# Data Structures

This section is a mix bag about data structures.

## Variables

Variables are declared with the ``let`` keyword. Variables are by default 
immutable (almost like a constant) unless they are define as mutable

```rust
let x:u8 = 5;
x = 5;  // cannot assign twice to immutable variable
let mut y:u8 = 10; // you can not change the data type of a mutable var
```
While seeming annoying, this is a very neat feature for memory safety
to ensure that variables are not set by accident (unless of course to 
use ``let``) as shown in the next example. Variables can be redeclared 
and shadowed previous definitions

```rust
let x: u8 = 10;
let x = x + 5;  // note that you can let compiler implicity assign the data type
```

[See chapter on Variables](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html)

## Constants

Unlike variables, constant can be declared in any scope. Also, constant can only 
be set to a const expression. 

```rust
const MAX_POINTS: u32 = 100_000;
```

## Data Types

scalars type are *integers*, *floats*, *booleans* and *characters*.

[See chapter on data types](https://doc.rust-lang.org/book/ch03-02-data-types.html)


|  Length 	| Signed 	| Unsigned 	|   	|                	|             	|
|:-------:	|:------:	|:--------:	|---	|----------------	|-------------	|
| 8-bit   	| i8     	| u8       	|   	| Decimal        	| 98_222      	|
| 16-bit  	| i16    	| u16      	|   	| Hex            	| 0xff        	|
| 32-bit  	| i32    	| u32      	|   	| Octal          	| 0o77        	|
| 64-bit  	| i64    	| u64      	|   	| Binary         	| 0b1111_0000 	|
| 128-bit 	| i128   	| u128     	|   	| Byte (u8 only) 	| b'A'        	|
| arch    	| isize  	| usize    	|   	|                	|             	|

Floating point can be ``f32`` or ``f64`` and booleans are ``bool``

```rust
let test: bool true;
let test: bool false;
```

Finally characters are like Python3 characters (Unicode)

## Tuples and Arrays

Same as Python. Immutable and can be composed of heterogenous types

```rust
let tup: (i32, f64, u8) = (200, 3.14, 255);
let typ: (200, 3.14, 255); // implicit ... not recommended
let (x, y, z) = tup;      // map to variables
let value = tup.1;         // access value using index (3.14)
```

Arrays are like tuples but each element must be of the same type. 

```rust
let array: [3;6]; // [6,6,6]
let array: [i8:4] = [1,2,3,4] ;
let x = array[1]; // 2
```

As a result, index errors may be caught at compile time (if the index was 
a constant), but it would also generate a runtime error if a variable was 
used (called panic) ... unlike in C or C++ ... good old buffer overruns. 

Finally, a Python like array in Rust is called a vector.


# Functions

Function parameters must be typed. The function body contains statements 
(performing something without resulting in an computed output) and 
expressions (which evaluate to a resulting value). Therefore, functions
themselves are expressions. A block/scope ``{}`` is also an expression. 

```rust

fn do_something(a: ui8, b: ui8){
    let x:ui8 = a;
    let z = {
        let y = b;
        x + y + 1
    };
}
```

Expression do not end with a ``;`` In the previous example ``{..}`` is an 
expression where as ``let z = {...};`` is the statement which assigns the 
value to the variable **z**.

functions may return values and those value must be typed. 

```rust
fn foo(bar: ui8) -> ui8{
    bar + 3
}
```
where ``bar + 3`` is an expression which is returned (no return keywords). 
``bar + 3;`` would have a generated a compiler error as the return value
was *void* but the expected type was *ui8*


[more on functions](https://doc.rust-lang.org/book/ch03-03-how-functions-work.html)

# Control Flow

Control flow constructs are pretty standard ...

## if/else

```rust
fn main() {
    let number = 6;

    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }

    if number { // This evaluate to a number where as if expects a boolean 
                // thus com[iler error]
        println!('baboom)
    }

    let number = if true { 5 } else { 6 }; // very similar to python
    let number = if condition { 5 } else { "six" }; // compilation error 
}
```

## loop

The ``loop`` is equivalent to ``while True:`` where looping occurs until 
a condition interrupts the flow. It is also possible to return a value in 
the process.

```rust
let mut x:ui8 = 0
let result = loop{
    x += 1;
    if x == 5{
        break x * 2; // 10 is returned
    }
}
```

## while 

```rust
let mut x:ui8 = 0
while x <= 5{
    x += 1;
}
```

## for

```rust
let a = [10, 20, 30, 40, 50];

for element in a.iter() {
    println!("the value is: {}", element);
}
```

[more on control flows](https://doc.rust-lang.org/book/ch03-05-control-flow.html)

# Memory Management and Ownership

Languages like Python use garbage collection which alleviate programmers to 
clean after themselves but introduce performance hit, whereas languages like 
C/C++ "trust" that programmers will do the right thing. Rust introduces the 
notion of [ownership](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html) 
where the compiler holds you accountable.

## Ownership

The ownership rules are:

- Each value in Rust has a variable that’s called its owner.
- There can only be one owner at a time.
- When the owner goes out of scope, the value will be dropped.

```rust
let stat = String::from("hello"); // On the stack
let mut owner = String::from("hello"); // On the heap
let string_pointer = owner; // owner no longer owns the variable
println!("{}", owner); // compiler error
```

So basically it means that we can not have more than one reference 
to a memory allocation on the heap. 

```shell
`3 |     let mut owner = String::from("hello"); // On the heap
   |         --------- move occurs because `owner` has type `std::string::String`, which does not implement the `Copy` trait
 4 |     let string_pointer = owner; // owner no longer owns the variable
   |                          ----- value moved here
 5 |     println!("{}", owner); // compiler error    
   |                    ^^^^^ value borrowed here after move
  ```

To make the last two statements above valid, we would have to clone it

```rust
let string_pointer = owner.clone(); // owner still owns the memory
                                    // string_pointer hold a copy of that string   
println!("{}", owner);              // no problem
```
The only types not subject to that rule are integers, floats, chars and
any tuples or array consisting of those types only.

If the data type does provide the "Copy" trait, a new memory allocation would be
made and the data copied to that location under the hoos.

Here is an even more complex example taken straight from the documentation

```rust
fn main() {
    let s = String::from("hello");  // s comes into scope

    takes_ownership(s);             // s's value moves into the function...
                                    // ... and so is no longer valid here

    let x = 5;                      // x comes into scope

    makes_copy(x);                  // x would move into the function,
                                    // but i32 is Copy, so it’s okay to still
                                    // use x afterward

} // Here, x goes out of scope, then s. But because s's value was moved, nothing
  // special happens.

fn takes_ownership(some_string: String) { // some_string comes into scope
    println!("{}", some_string);
} // Here, some_string goes out of scope and `drop` is called. The backing
  // memory is freed.

fn makes_copy(some_integer: i32) { // some_integer comes into scope
    println!("{}", some_integer);
} // Here, some_integer goes out of scope. Nothing special happens.

```

Only one variable can refer to a memory region at any given time. When that 
variable goes out of scope, that region is released automatically. Thus the compiler 
can follow strict ownership and when that rule is broken.

So basically, when you pass a variable to a function, you loose its ownership.
To illustrate this, let write 

```rust
fn main() {
    let s1 = String::from("Hello");
    let s2 = by_value(s1);
    println!("s1={}", s1);
    println!("s2={}", s2);
}
fn by_value(s: String) -> String{
    s
}
```
which will result in the following compilation error (self explanatory)

```shell
 --> src/main.rs:4:23
  |
2 |     let s1 = String::from("Hello");
  |         -- move occurs because `s1` has type `std::string::String`, which does not implement the `Copy` trait
3 |     let s2 = by_value(s1);
  |                       -- value moved here
4 |     println!("s1={}", s1);
  |                       ^^ value borrowed here after move

```
A way to solve this would be 

```rust
fn main() {
    let s1 = String::from("Hello");
    let s1 = by_value(s1);
    println!("s1={}", s1);
}
```
where we regained the ownership through the return value, but this is quite 
cumbersome ... so here comes references

more on ownership can be found [here](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)

## References

```rust
fn main() {
    let s1 = String::from("Hello");
    by_value(&s1);
    println!("s1={}", s1);
}
fn by_value(s: &String) -> usize{
    s.len()
}
```

which are very similar to C++ references. In this particular instance, 
``s1`` regains the ownership of the memory area after the call. 

However, unlike C++, the called function may not modified the actual
parameter value. For this to happen, one must declare the formal parameter
 as mutable. And of course, the variable itself must be declared at such. In
 other words, the function says I will modify the memory and the variables 
 says I am allowing myself to be modified. 

```rust
fn main() {
    let mut s1 = String::from("Hello");
    by_value(&mut s1);
    println!("s1={}", s1);
}
fn by_value(s: &mut String) -> usize{
    s.push_str(", Fakayu!");
    s.len()
}
```
which yields

```shell
    Compiling explore v0.1.0 (/home/laurent/github/tinker/rust/explore)
    Finished dev [unoptimized + debuginfo] target(s) in 0.16s
    Running `target/debug/explore`
s1=Hello, Fakayu!
```

[More on references](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)

Do in summary

- var: type - We want ownership and the original owner gives it away
- var: &type - We don't want ownership
- var: &mut type we don't want ownership but will modify the memory (most likely)

And 

- The function must be declared as such ``fn by_value(s: &mut String) -> usize``
- the variable must be declared as such ``let mut s1 = String::from("Hello");``
- The function must be called as such ``by_value(&mut s1);``

## Slices

A slice is a variable that holds a **reference** to a region of a memory block.
For instance

```rust
    let s = String::from("hello world");
    let hello = &s[0..5];
    let world = &s[6..11];    
    println!("{}", hello);
    println!("{}", world);
```

For full details on slices click [here](https://doc.rust-lang.org/book/ch04-03-slices.html)

# Structures

Structure are very much like C++ structures. Rememer that C++ structures a C structures
supporting methods. By default those methods are always public. They are like Rust 
tuples but rather than accessing their elements using an index, you can use names.

- To make a structure modifiable, you need to declare the variable pointing to it 
  as mutable.
- The entire structure becomes modifiable from this point on. 

```rust

#[derive(Debug)] // this allows us to print the struct wihtout the Diplay trait
struct Point{
    x: i32,
    y: i32,
    z: i32,
}
fn main() {
    let origin = Point {
        x: 0,
        y: 0,
        z: 0
    }; // Immutable variable pointing to a point

    let mut target = Point {
        x: 3,
        ..origin // Update syntax which default y,z to origins values
    };
    let mut visor = new_point(1,2,3); // constructor like syntax
    println!("origin={:#?}", origin);
    println!("target={:#?}", target);
    println!("visor={:#?}", visor);

}

fn new_point(x: i32, y:i32, z:i32) -> Point {
    Point {x, y,z,}
}
```

which produces
```shell
    origin=Point {
        x: 0,
        y: 0,
        z: 0,
    }
    target=Point {
        x: 3,
        y: 0,
        z: 0,
    }
    visor=Point {
        x: 1,
        y: 2,
        z: 3,
    }
```

Finally you can create Tuple Structs without named field

```rust
struct Point2(i32, i32, i32); // Note the use if () instead of {}
let mut target = Point2(127, 127, 127);
println!("target X={}", target.0)
```

Check the [chapter on structures](https://doc.rust-lang.org/book/ch05-01-defining-structs.html)
for more details.

## Methods

As mentioned, Rust structures are very similar to C++ structure. Thus to associated method
to them, you encapsulate the function ``fn`` in an ``imp`` block as shown below

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}
```

The first argument is a reference to the structure itself which could also be written

```rust
impl Rectangle {
    fn area(rectangle: &Rectangle) -> u32 {
        self.width * self.height
    }
}
```

Of course, the same rules of ownership apply. A method that modifies the structure 
would have to take a mutable reference. For instance, for a method to be able 
to modify its member, the implementation must take a mutable reference and the 
variables must be defined as mutable. 

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn double(&mut self) {
        self.width *= 2
        self.height *= 2
    }
}

let mut rec = Rectangle{ width=20, height=40}; 

```

See [Method Syntax](https://doc.rust-lang.org/book/ch05-03-method-syntax.html)

### Associated Functions

Basically static methods. Often use as constructors. 

