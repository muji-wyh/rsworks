/**
 * "abcde"
 */
const process = (str) => {
    if (!str.length) {
        return ['']
    }

    const next = process(str.substring(1))

    return next.map((s) => `${str[0]}${s}`).concat(next)
}

const itWorks = () => {
    console.log(process('abcde'))
}

itWorks()
