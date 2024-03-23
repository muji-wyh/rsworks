/**
 * 9 <- 4 <- 5 <- 6 <- 7
 *      9 <- 5 <- 1 <- 4
 */
const process = (head1, head2) => {
    let p1 = head1
    let p2 = head2
    let c = 0
    const result = {}
    let node = result

    while (p1 || p2 || c) {
        let val = (p1?.val ?? 0) + (p2?.val ?? 0) + c

        if (val >= 10) {
            val = val - 10
            c = 1
        } else {
            c = 0
        }

        node.val = val

        if (!p1 && !p2 && !c) {
            node.next = null
            break
        }

        node.next = {}
        node = node.next

        p1 = p1?.next
        p2 = p2?.next
    }

    return result
}

const itWorks = () => {
    const list1 = {
        val: 7,
        next: {
            val: 6,
            next: {
                val: 5,
                next: {
                    val: 4,
                    next: {
                        val: 9,
                        next: null,
                    },
                },
            },
        },
    }

    const list2 = {
        val: 4,
        next: {
            val: 1,
            next: {
                val: 5,
                next: {
                    val: 9,
                    next: null,
                },
            },
        },
    }

    console.log(process(list1, list2))
}

itWorks()
