'use client'

import React, { useCallback } from 'react'
import Layout from '@/app/components/Layout'
import { useT1 } from './myHooks'

export default function C() {
    const { num, setter } = useT1()

    const handleClick = useCallback(() => {
        setter(num + 1)
    }, [num])

    return (
        <Layout>
            <p className="tips">hooks</p>

            <p>
                <span className="">num: {num}</span>

                <button onClick={handleClick}>click</button>
            </p>

            <style jsx>{`
                .tips {
                    color: #aaa;
                    font-size: 24px;
                    text-align: center;
                    margin-top: 30vh;
                }
            `}</style>
        </Layout>
    )
}
