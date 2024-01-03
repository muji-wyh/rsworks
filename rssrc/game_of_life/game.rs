use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub struct State {
    x_size: usize,
    y_size: usize,
    size: usize,

    // true - live, false - died
    cells: Vec<bool>,
}

#[wasm_bindgen]
impl State {
    fn new(x_size: usize, y_size: usize) -> Self {
        let size = x_size * y_size;
        Self {
            x_size,
            y_size,
            size,
            cells: vec![false; size],
        }
    }

    fn should_alive(&self, i: usize) -> bool {
        let i_is_at_left = i % self.x_size == 0;
        let i_is_at_top = i < self.x_size;
        let i_is_at_bottom = i >= (self.x_size * (self.y_size - 1));
        let i_is_at_right = i % self.x_size == self.x_size - 1;
        let i_is_alive = self.cells[i];

        let c0 = {
            if i_is_at_left || i_is_at_top {
                None
            } else {
                Some(self.cells[i - self.x_size - 1])
            }
        };

        let c1 = {
            if i_is_at_top {
                None
            } else {
                Some(self.cells[i - self.x_size])
            }
        };

        let c2 = {
            if i_is_at_right || i_is_at_top {
                None
            } else {
                Some(self.cells[i - self.x_size + 1])
            }
        };

        let c3 = {
            if i_is_at_left {
                None
            } else {
                Some(self.cells[i - 1])
            }
        };

        let c4 = {
            if i_is_at_right {
                None
            } else {
                Some(self.cells[i + 1])
            }
        };

        let c5 = {
            if i_is_at_left || i_is_at_bottom {
                None
            } else {
                Some(self.cells[i + self.x_size - 1])
            }
        };

        let c6 = {
            if i_is_at_bottom {
                None
            } else {
                Some(self.cells[i + self.x_size])
            }
        };

        let c7 = {
            if i_is_at_right || i_is_at_bottom {
                None
            } else {
                Some(self.cells[i + self.x_size + 1])
            }
        };

        let live_neighbours = {
            let neighbours = [c0, c1, c2, c3, c4, c5, c6, c7];

            neighbours.iter().filter(|&&x| x.unwrap_or(false)).count()
        };

        if i_is_alive {
            (2..=3).contains(&live_neighbours)
        } else {
            live_neighbours == 3
        }
    }

    pub fn get_alive(&self, index: usize) -> bool {
        self.cells[index]
    }

    pub fn set_alive(&mut self, index: usize, live: bool) {
        self.cells[index] = live;
    }

    pub fn next_ticket(&mut self) {
        let mut next_cells: Vec<bool> = Vec::with_capacity(self.size);

        for i in 0..self.size {
            next_cells.push(self.should_alive(i));
        }

        self.cells = next_cells;
    }
}

#[wasm_bindgen]
pub fn start_game(x_size: usize, y_size: usize) -> State {
    State::new(x_size, y_size)
}

#[test]
fn test_1() {
    let mut game = start_game(10, 20);
    game.set_alive(0, true);
    game.next_ticket();
    println!("test_1, {}", game.get_alive(0));
}
