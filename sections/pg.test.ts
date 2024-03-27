import { describe } from 'node:test'

type Point = [number, number]

export const process = (points: Point[], point: Point, k: number) => {
    //
    console.log(123)
}

describe('it works', () => {
    test('process', () => {
        process([], [1, 2], 3)
    })
})
