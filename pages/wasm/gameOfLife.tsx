'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Layout from '@/app/components/Layout'
import { start_game, type State } from '../../wasms/wasmworks'
import { Button } from '@byted-image/lv-components'

export default function C() {
    const x_size = 200
    const y_size = 200
    const cell_padding = 1
    const total_size = x_size * y_size
    const alive_color = '#000'
    const died_color = '#f0f0f0'
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const contextRef = useRef<CanvasRenderingContext2D | null>(null)
    const cellSizeXRef = useRef<number>(-1)
    const cellSizeYRef = useRef<number>(-1)
    const [started, setStarted] = useState(false)

    const { game } = useMemo(() => {
        const result = start_game(x_size, y_size)
        return { game: result }
    }, [])

    const init = useCallback(() => {
        const dpr = window.devicePixelRatio
        const canvas = canvasRef.current!
        const { width: boundingWidth, height: boundingHeight } =
            canvas.getBoundingClientRect()
        canvas.width = boundingWidth * dpr
        canvas.height = boundingHeight * dpr

        contextRef.current = canvas.getContext('2d')!
        cellSizeXRef.current = canvas.width / x_size
        cellSizeYRef.current = canvas.height / y_size

        // @ts-ignore
        window.game = game
    }, [])

    const draw = useCallback(
        (tickWhenFinish: boolean = false) => {
            const cell_size_x = cellSizeXRef.current
            const cell_size_y = cellSizeYRef.current
            const context = contextRef.current!

            for (let i = 0; i < total_size; ++i) {
                context.fillStyle = game.get_alive(i) ? alive_color : died_color

                const row = Math.floor(i / x_size)
                const col = i % x_size

                const x = col * cell_size_x
                const y = row * cell_size_y

                context.fillRect(
                    x + cell_padding,
                    y + cell_padding,
                    cell_size_x - 2 * cell_padding,
                    cell_size_y - 2 * cell_padding
                )
            }

            if (started) {
                game.next_ticket()
            }
        },
        [started]
    )

    useEffect(() => {
        init()

        let rafId = 0

        const loop = () => {
            rafId = self.requestAnimationFrame(() => {
                draw()
                loop()
            })
        }

        loop()

        return () => self.cancelAnimationFrame(rafId)
    })

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const dpr = window.devicePixelRatio
        e.preventDefault()

        const { offsetX, offsetY } = e.nativeEvent
        const row = Math.floor(offsetY / (cellSizeYRef.current / dpr))
        const col = Math.floor(offsetX / (cellSizeXRef.current / dpr))
        const index = row * x_size + col

        if (e.buttons !== 1) {
            return
        }

        game.set_alive(index, true)
    }, [])

    const handleStart = useCallback(() => {
        setStarted(!started)
    }, [started])

    return (
        <Layout>
            <div className="">
                <Button onClick={handleStart}>
                    {started ? 'stop' : 'start'}
                </Button>
            </div>

            <div className="canvas-wrap">
                <canvas
                    className="canvas"
                    ref={canvasRef}
                    onMouseMove={handleMouseMove}
                />
            </div>

            <style jsx>{`
                .canvas-wrap {
                    padding: 10px;
                    background: #777;
                    display: flex;
                    justify-content: center;

                    & .canvas {
                        width: 1200px;
                        height: 1200px;
                        box-sizing: border-box;
                        background: #fff;
                    }
                }
            `}</style>
        </Layout>
    )
}
