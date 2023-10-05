/**
 * @param {number[]} nums
 * @return {number[]}
 */
const majorityElement = (nums) => {
    const n = nums.length / 3
    const map = {}
    const result = []

    nums.forEach((d) => {
        if (map[d] === undefined) {
            map[d] = 0
        }

        map[d]++

        if (map[d] > n && map[d] <= n + 1) {
            result.push(d)
        }
    })

    return result
}
