'use client'

import React from 'react'
import Layout from '@/app/components/Layout'

export default function Home() {
    return (
        <Layout>
            <p className="tips">checkout menus</p>

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
