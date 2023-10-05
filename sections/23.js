function ListNode(val, next) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
const mergeKLists = (lists) => {
    let heads = lists.map((d) => d)
    const result = {
        next: null,
    }
    let resultTmpHead = result

    const findNode = () => {
        let r = -1
        let tmpVal = Infinity

        for (let i = 0; i < heads.length; ++i) {
            const item = heads[i]

            if (!item) {
                continue
            }

            if (item.val < tmpVal) {
                r = i
                tmpVal = item.val
            }
        }

        return r
    }

    let index = findNode()

    while (index !== -1) {
        const list = heads[index]

        const node = new ListNode(list.val)
        resultTmpHead.next = node
        resultTmpHead = node

        heads[index] = heads[index].next
        index = findNode()
    }

    return result.next
}
