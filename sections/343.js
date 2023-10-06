const map = {}

/**
 * 将 n 分成 k 分
 * @param {number} n
 * @param {number} k - 分成 k 分，k <= n
 * @param {{ key: string: number }} tmpMap - 分成 k 分，k <= n
 * @return {number} - 最大积
 */
const process = (n, k, tmpMap) => {
    const key = `${n}_${k}`

    if (tmpMap[key] !== undefined) {
        return tmpMap[key]
    }

    if (k === 1) {
        return n
    }

    if (n === k) {
        return 1
    }

    if (n === k + 1) {
        return 2
    }

    let r = -Infinity

    for (let i = 1; i <= n - k + 1; ++i) {
        const t = i * process(n - i, k - 1, tmpMap)

        if (t > r) {
            r = t
        }
    }

    tmpMap[key] = r

    return r
}

/**
 * @param {number} n
 * @return {number}
 */
const integerBreak = (n) => {
    const tmpMap = {}

    return Math.max(
        ...Array(n - 1)
            .fill(null)
            .map((_, i) => process(n, i + 2, tmpMap))
    )
}

// console.log(integerBreak(2))
// console.log(integerBreak(3))
// console.log(integerBreak(4))
// console.log(integerBreak(10))
// console.log(integerBreak(11))
// console.log(integerBreak(58))
