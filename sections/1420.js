/**
 *
 * @param n
 * @param m
 * @param k
 * @param map
 */
const process = (n, m, k, map = {}) => {
    const key = `${n}_${m}_${k}`

    if (map[key] !== undefined) {
        return map[key]
    }

    let sum = 0

    // 最后一次上升在 i 处
    for (let i = n - 1; i >= 0; --i) {
        for (let d = m; d >= 1; --d) {
            let sub1 = 0

            if (i > 0 && k === 1) {
                sub1 = 0
            } else if (i === 0 && k === 1) {
                sub1 = 1
            } else {
                sub1 = process(i, d - 1, k - 1, map)
            }

            const sub2 = d ** (n - i - 1)
            const sub = sub1 * sub2
            sum += sub
        }
    }

    map[key] = sum

    return sum
}

/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @return {number}
 * [1,2,3,4,5,6]
 */
const numOfArrays = (n, m, k) => {
    return process(n, m, k)
}

// console.log(numOfArrays(2, 3, 1))
// console.log(numOfArrays(5, 4, 3))
// console.log(numOfArrays(5, 2, 3))
// console.log(numOfArrays(9, 1, 1))
console.log(numOfArrays(50, 100, 25))
