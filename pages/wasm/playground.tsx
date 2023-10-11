'use client'

import React, { useEffect } from 'react'
import Layout from '@/app/components/Layout'
import { work } from '../../wasms/wasmworks'

export default function C() {
    useEffect(() => {
        console.info(123, work())
    }, [])

    return (
        <Layout>
            <p className="tips">wasm</p>

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
