/**
 * 1 2 3 4 5 6 7 8 9 10
 */
const process = (ary, num) => {
    if (ary.length === 2) {
        return ary[0] === num || ary[1] === num
    }

    if (ary.length === 1) {
        return ary[0] === num
    }

    if (!ary.length) {
        return false
    }

    let i = 0
    let j = ary.length - 1
    let mid = Math.floor((i + j) / 2)

    if (ary[mid] === num) {
        return true
    }

    if (ary[mid] > num) {
        j = mid
    } else {
        i = mid
    }

    return process(ary.slice(i, j + 1), num)
}

/**
 * 1 2 3 4 5 6 7 8 9 10
 */
const process2 = (ary, num) => {
    let i = 0
    let j = ary.length - 1

    while (i < j) {
        let mid = Math.floor((i + j) / 2)

        if (ary[mid] === num) {
            return true
        }

        if (ary[mid] > num) {
            j = mid - 1
        } else {
            i = mid + 1
        }
    }

    return ary[i] === num
}

const itWorks = () => {
    console.log(process2([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 11))
}

itWorks()
