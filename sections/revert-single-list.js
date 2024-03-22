/**
 * 1 -> 2 -> 3 -> 4 -> 5 -> null
 * 1 -> null
 * 1 -> 2 -> null
 * a    b
 *      a    b
 * @param head
 */
const revert = (head) => {
    if (!head.next) {
        return head
    }

    let a = head
    let b = a.next

    a.next = null

    while (b) {
        const c = b.next
        b.next = a
        a = b
        b = c
    }

    return a
}

const itWorks = () => {
    const list_1 = {
        val: 0,
        next: {
            val: 1,
            next: {
                val: 2,
                next: {
                    val: 3,
                    next: {
                        val: 4,
                        next: {
                            val: 5,
                            next: null,
                        },
                    },
                },
            },
        },
    }

    const list_2 = {
        val: 0,
        next: null,
    }

    // console.log('1', revert(list_1))
    console.log('1', revert(list_2))
}

itWorks()
