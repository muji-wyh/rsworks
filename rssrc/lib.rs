pub mod rustlings;
mod game_of_life;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn work() -> usize {
    42
}