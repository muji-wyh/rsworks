const getAllIndices = (ary) => {
    const result = new Set()

    ary.forEach((subAry) => {
        subAry.forEach((num) => result.add(num))
    })

    return result
}

const getNotAllowSwapIndices = (set, num) => {
    const result = new Set()

    for (let i = 0; i < num; ++i) {
        if (set.has(i)) {
            continue
        }

        result.add(i)
    }

    return result
}

const getHammingDifferent = (
    source,
    target,
    allowSwapIndices,
    notAllowSwapIndices
) => {
    const mapOfAllowSwap = {}
    let hammingDifferentOfAllowSwap = 0
    let hammingDifferentOfNowAllowSwap = 0

    for (const i of allowSwapIndices) {
        mapOfAllowSwap[source[i]] = true
    }

    for (const i of allowSwapIndices) {
        if (mapOfAllowSwap[target[i]]) {
            continue
        }

        hammingDifferentOfAllowSwap++
    }

    // ====

    for (const i of notAllowSwapIndices) {
        if (source[i] === target[i]) {
            continue
        }

        hammingDifferentOfNowAllowSwap++
    }

    return hammingDifferentOfAllowSwap + hammingDifferentOfNowAllowSwap
}

/**
 * @param {number[]} source
 * @param {number[]} target
 * @param {number[]} allowedSwap
 *
 * @example
 * [1,2,3,4]
 * [2,1,4,5]
 * [[0,1], [2,3], [1,2], [1,3], [2,3]]
 */
const process = (source, target, allowedSwap) => {
    const allowSwapIndices = getAllIndices(allowedSwap)
    const notAllowSwapIndices = getNotAllowSwapIndices(
        allowSwapIndices,
        source.length
    )

    return getHammingDifferent(
        source,
        target,
        allowSwapIndices,
        notAllowSwapIndices
    )
}

const itWorks = () => {
    const source_1 = [1, 2, 3, 4]
    const target_1 = [1, 2, 3, 4]

    console.log(process(source_1, target_1, []))
    console.log(process(source_1, target_1, [[0, 1]]))

    const source_2 = [1, 2, 5, 4]
    const target_2 = [1, 2, 3, 4]
    console.log(process(source_2, target_2, [[0, 1]]))

    const source_3 = [1, 2, 4, 3]
    const target_3 = [1, 2, 3, 4]
    console.log(process(source_3, target_3, [[0, 1]]))
    console.log(process(source_3, target_3, [[2, 3]]))
}

itWorks()
