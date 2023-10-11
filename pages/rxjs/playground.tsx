'use client'

import React, { useEffect } from 'react'
import Layout from '@/app/components/Layout'
import { connectable, of, from, Subject, interval } from 'rxjs'
import { tap, take } from 'rxjs/operators'

export default function C() {
    useEffect(() => {
        const obs1$ = connectable(interval(500).pipe(take(5)), {
            connector: () => new Subject(),
        })

        const obs2$ = interval(500).pipe(take(5))

        const obs$ = obs1$

        obs$.subscribe((d) => {
            window.console.info('>>> 1-', d)
        })

        obs$.subscribe((d) => {
            window.console.info('>>> 2-', d)
        })

        obs$.connect()
    }, [])

    return (
        <Layout>
            <p className="tips">rxjs playground</p>

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
