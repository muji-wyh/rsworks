'use client'

import React, { useEffect, useState } from 'react'
import Layout from '@/app/components/Layout'
import { connectable, of, from, Subject, interval, BehaviorSubject } from 'rxjs'
import { tap, take } from 'rxjs/operators'
import { Tips } from '@/app/components/Tips'

export default function C() {
    const foo = 'my-foo'

    const [bg, setBg] = useState('tan')

    useEffect(() => {
        //
    }, [])

    return (
        <Layout>
            <Tips>rxjs playground</Tips>

            <span
                onClick={() => {
                    setBg('red')
                }}
            >
                123123123
            </span>

            <p className="foo">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusantium beatae dicta doloremque eos eum fugiat, hic itaque
                iure, magnam molestias nesciunt numquam perferendis praesentium
                quaerat similique velit voluptas! Laborum, suscipit!
            </p>

            <p className={foo}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aspernatur aut delectus eius eos esse eum fugiat harum, in,
                ipsam magnam, nesciunt non quasi rem rerum sit temporibus totam
                voluptas. Iure!
            </p>

            <style jsx>{`
                .foo {
                    color: tan;
                }

                .${foo} {
                    background: ${bg};
                }
            `}</style>
        </Layout>
    )
}
