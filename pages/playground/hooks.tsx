'use client'

import React, { useCallback, useState } from 'react'
import Layout from '@/app/components/Layout'
import { Tips } from '@/app/components/Tips'

const useT1 = () => {
    const [num, setNum] = useState(0)

    const setter = (n: number) => {
        setNum(n)
    }

    return {
        num,
        setter,
    }
}

export default function C() {
    const { num, setter } = useT1()

    const handleClick = useCallback(() => {
        setter(num + 1)
    }, [num])

    return (
        <Layout>
            <Tips>hooks</Tips>

            <p>
                <span className="">num: {num}</span>

                <button onClick={handleClick}>click</button>
            </p>
        </Layout>
    )
}
