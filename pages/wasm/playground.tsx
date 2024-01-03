'use client'

import React, { useEffect } from 'react'
import Layout from '@/app/components/Layout'

export default function C() {
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
