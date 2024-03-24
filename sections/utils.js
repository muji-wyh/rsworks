/**
 * @param ary - [1, 2, 3]
 * @return {{ val: 1, next: { val: 2, next: { val: 3, next: null } } }}
 */
const genSingleLinkedList = (ary) => {
    let result = null
    let tail = result

    ary.forEach((val) => {
        if (!result) {
            result = {
                val,
                next: null,
            }
            tail = result
        } else {
            const next = {
                val,
                next: null,
            }
            tail.next = next
            tail = next
        }
    })

    return result
}

const test_genSingleLinkedList = () => {
    console.log(JSON.stringify(genSingleLinkedList([1, 2, 3])))
}

// test_genSingleLinkedList()

module.exports = {
    genSingleLinkedList,
}
