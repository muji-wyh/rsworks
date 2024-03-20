/**
 * "()" true
 * ")(" false
 * "())" false
 * "(*)" true
 * "(*)) true
 * "(*)))" false
 * "()*)**)" false
 */

/**
 * @param {string} str
 * @returns {boolean}
 */
const process = (str) => {
    if (!str.length) {
        return true
    }

    let matchedNum = 0
    let starNum = 0

    for (let i = 0; i < str.length; ++i) {
        const char = str[i]

        if (char === '*') {
            starNum++
        }

        if (char === '(') {
            matchedNum--
        }

        if (char === ')') {
            matchedNum++
        }

        // check if "())****" exists
        // check if "())()" exists
        if (matchedNum === 1 && starNum < 1) {
            return false
        }
    }

    if (matchedNum === 0) {
        return true
    }

    return starNum - Math.abs(matchedNum) >= 0
}

const caseList = [
    //
    '',
    '()',
    '(*)',
    '*(*)*',
    '(**)',
    '()*)',
    '()**)',
    '*()*)',
    '())',
    '()(',
    '(',
    ')',
]

caseList.forEach((oneCase, i) => console.log(i, process(oneCase)))
