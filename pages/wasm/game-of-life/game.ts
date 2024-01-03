export class GameOfLife {
    private size: number
    private cells: boolean[]

    constructor(
        private x_size: number,
        private y_size: number
    ) {
        this.size = x_size * y_size
        this.cells = []
    }

    should_alive(i: number): boolean {
        const self = this
        let i_is_at_left = i % self.x_size == 0
        let i_is_at_top = i < self.x_size
        let i_is_at_bottom = i >= self.x_size * (self.y_size - 1)
        let i_is_at_right = i % self.x_size == self.x_size - 1
        let i_is_alive = self.cells[i]

        let c0 =
            i_is_at_left || i_is_at_top
                ? false
                : self.cells[i - self.x_size - 1]

        let c1 = i_is_at_top ? false : self.cells[i - self.x_size]
        let c2 =
            i_is_at_right || i_is_at_top
                ? false
                : self.cells[i - self.x_size + 1]
        let c3 = i_is_at_left ? false : self.cells[i - 1]
        let c4 = i_is_at_right ? false : self.cells[i + 1]
        let c5 =
            i_is_at_left || i_is_at_bottom
                ? false
                : self.cells[i + self.x_size - 1]
        let c6 = i_is_at_bottom ? false : self.cells[i + self.x_size]

        let c7 =
            i_is_at_right || i_is_at_bottom
                ? false
                : self.cells[i + self.x_size + 1]

        const live_neighbours = [c0, c1, c2, c3, c4, c5, c6, c7].filter(
            Boolean
        ).length

        return i_is_alive
            ? [2, 3].includes(live_neighbours)
            : live_neighbours == 3
    }

    get_alive(index: number): boolean {
        return this.cells[index]
    }

    set_alive(index: number, alive: boolean) {
        this.cells[index] = alive
    }

    next_ticket() {
        const next_cells = []

        for (let i = 0; i < this.size; ++i) {
            next_cells.push(this.should_alive(i))
        }

        this.cells = next_cells
    }
}
