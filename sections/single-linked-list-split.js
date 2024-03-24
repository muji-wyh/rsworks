const { genSingleLinkedList } = require('./utils')

/**
 * 4 -> 6 -> 5 -> 4 -> 3 -> 1 -> 1 -> 7
 * num = 4
 */
const process = (list, num) => {
    let smaller = null
    let headOfSmaller = smaller
    let tailOfSmaller = smaller

    // >=
    let bigger = null
    let headOfBigger = bigger
    let tailOfBigger = bigger

    // loop
    let head = list

    while (head) {
        const val = head.val

        if (val < num) {
            // put to smaller
            if (!smaller) {
                smaller = {
                    val,
                    next: null,
                }

                headOfSmaller = smaller
                tailOfSmaller = smaller
            } else {
                const next = {
                    val,
                    next: null,
                }
                tailOfSmaller.next = next
                tailOfSmaller = next
            }
        } else {
            // put to bigger
            if (!bigger) {
                bigger = {
                    val,
                    next: null,
                }

                headOfBigger = bigger
                tailOfBigger = bigger
            } else {
                const next = {
                    val,
                    next: null,
                }
                tailOfBigger.next = next
                tailOfBigger = next
            }
        }

        head = head.next
    }

    // smaller 为空
    if (!tailOfSmaller) {
        return list
    }

    tailOfSmaller.next = headOfBigger

    return headOfSmaller
}

const itWorks = () => {
    console.log(
        JSON.stringify(
            process(genSingleLinkedList([4, 6, 5, 4, 3, 1, 1, 7]), 5)
        )
    )
}

itWorks()
