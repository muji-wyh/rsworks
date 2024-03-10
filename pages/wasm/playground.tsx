'use client'

import React, { useCallback, useEffect } from 'react'
import Layout from '@/app/components/Layout'
import { Button } from '@byted-image/lv-components'
import { DemoBlock } from '@/app/components/DemoBlock'

export default function C() {
    const demo1 = useCallback(async () => {
        const ins = await window.WebAssembly.instantiateStreaming(
            fetch('/wasm/playground/wat-to-wasm.wasm'),
            {
                imports: {
                    log: (str: string) => {
                        window.console.info(`get: ${str}`)
                    },
                },
            }
        )

        // @ts-ignore
        ins.instance.exports.log('hello?')
    }, [])

    const demo2 = useCallback(async () => {
        const memory = new WebAssembly.Memory({ initial: 1, maximum: 10 })
        const buffer = new Uint32Array(memory.buffer)

        const start = 0
        const len = 10

        for (let i = start; i < len; ++i) {
            buffer[i] = i
        }

        const ins = await window.WebAssembly.instantiateStreaming(
            fetch('/wasm/playground/wat-sum.wasm'),
            {
                js: {
                    mem: memory,
                },
            }
        )

        // @ts-ignore
        const result = ins.instance.exports.accumulate(start, len)

        console.log('result', result)
    }, [])

    return (
        <Layout>
            <DemoBlock tips={<p>first wasm with s-expression</p>}>
                <Button onClick={demo1}>run</Button>
            </DemoBlock>

            <DemoBlock tips={<p>js 初始化内存，并在 wasm 中读取</p>}>
                <Button onClick={demo2}>run</Button>
            </DemoBlock>
        </Layout>
    )
}
