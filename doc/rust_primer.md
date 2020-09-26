# Rust Primer

This chapter is by no means a replacement for 
[the Rust Programming Language](https://doc.rust-lang.org/book/) book
but is intended to give you the 5 (or mayb 10) minute dog an pony show. 
Since it assumes that we all know Python, I will try to make parallels 
whenever possible.

Like in C, stattements must terminated by a semicolon (*;*). and comments are the C++ style
``//``

# Table Of Content

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


# Data Structures

This section is a mix bag about data structures.

## Variables

Variables are declared with the ``let`` keyword. Variables are by default 
immutable (almost like a constant) unless they are define as mutable

```rust
let x:u8 = 5;
x = 5  // cannot assign twice to immutable variable
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
const MAX_POINTS: u32 = 100_000
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
Expression do not end with a ``;`` In the previous example ``{..}`` is an 
expression where as ``let z = {...};`` is the statement which assigns the 
value to the variable **z**.
```

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
notion of **ownership** where the compiler hold you accountable.