import { useState } from 'react'

export const useT1 = () => {
    const [num, setNum] = useState(0)

    const setter = (n: number) => {
        setNum(n)
    }

    return {
        num,
        setter,
    }
}
