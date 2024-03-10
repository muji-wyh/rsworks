mod game_of_life;
pub mod rustlings;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn work() -> usize {
    42
}

trait Greet {
    fn say_hello(&self);
}

struct Man {}

impl Greet for Man {
    fn say_hello(&self) {
        println!("man: hello");
    }
}

struct Dog {}

fn say<T: Greet>(who: T) -> impl Greet {
    who.say_hello();

    Man {}
}

#[test]
fn test() {
    let man = say(Man {});
    man.say_hello()
}
