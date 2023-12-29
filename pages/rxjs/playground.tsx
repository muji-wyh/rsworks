'use client'

import React, { useEffect } from 'react'
import Layout from '@/app/components/Layout'
import { connectable, of, from, Subject, interval, BehaviorSubject } from 'rxjs'
import { tap, take } from 'rxjs/operators'

export default function C() {
    useEffect(() => {
        function dec<T extends { new (...args: any[]): {} }>(ctor: T) {
            console.log('>>> dec:', ctor, b)
            return class extends ctor {
                'sub' = 'sub report'
            }
        }

        const dec2 = <T extends { new (...args: any[]): {} }>() => {}

        @dec
        class Report {
            type = 'report'
            title: string

            constructor(t: string) {
                this.title = t
            }
        }

        const report = new Report('111')

        console.log('>>> report', report.title, report.type, report.sub)
    }, [])

    return (
        <Layout>
            <p className="tips">rxjs playground</p>

            <p className="a">aaa</p>
            <p className="b">bbb</p>

            <style jsx>{`
                .a {
                    margin-bottom: 88px;
                }

                .b {
                    margin-top: 88px;
                }

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
