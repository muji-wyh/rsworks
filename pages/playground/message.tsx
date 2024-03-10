'use client'

import React, { useEffect, useRef, useState } from 'react'
import Layout from '@/app/components/Layout'
import { Tips } from '@/app/components/Tips'
import { DemoBlock } from '@/app/components/DemoBlock'
import { Button } from '@byted-image/lv-components'

class Message {
    target: Window

    constructor(target: Window) {
        this.target = target
    }

    send(data: string): Promise<string> {
        return new Promise((resolve) => {
            const id = Math.random()

            this.target.postMessage({
                id,
                data,
            })

            const handleMessage = (
                e: MessageEvent<{ id: number; data: any }>
            ) => {
                if (e.data.id !== id) {
                    return
                }

                window.removeEventListener('message', handleMessage)

                resolve(e.data.data)
            }

            window.addEventListener('message', handleMessage)
        })
    }
}

export default function C() {
    const win = useRef<Window>()

    const handleClick = async () => {
        if (!win.current) {
            return
        }

        const message = new Message(win.current)
        const res1 = message.send('hello')
        const res2 = message.send('world')
        const data1 = await res1
        const data2 = await res2

        console.info('data:', data1, data2)
    }

    useEffect(() => {
        window.addEventListener('message', (e) => {
            if (
                !e.source ||
                e.origin != 'http://localhost:3000' ||
                !e.data.id
            ) {
                return
            }

            console.info('message', e)

            if (e.source === self) {
                return
            }

            e.source.postMessage({
                id: e.data.id,
                data: `hi, ${e.data.data}, ${e.data.id}`,
            })
        })
    }, [])

    const handleOpen = () => {
        win.current = window.open('http://localhost:3000/playground/message')!
    }

    useEffect(() => {
        // @ts-ignore
        window.foo = 'foo'
    }, [])

    return (
        <Layout>
            <DemoBlock tips="postMessage">
                <Button onClick={handleOpen}>open</Button>
                <Button onClick={handleClick}>send message</Button>
            </DemoBlock>

            <Tips>message</Tips>
        </Layout>
    )
}
