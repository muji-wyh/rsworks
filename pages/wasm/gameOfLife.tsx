'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Layout from '@/app/components/Layout'
import { start_game, type State } from '@/wasms/wasms-optimized/wasmworks'
import { Button, Radio } from '@byted-image/lv-components'
import { GameOfLife } from '@/pages/wasm/game-of-life/game'

const RadioGroup = Radio.Group
const x_size = 100
const y_size = 100
const cell_padding = 1
const total_size = x_size * y_size
const alive_color = '#000'
const died_color = '#f0f0f0'
const mute_draw = false

const debounce_number = 0

const default_cells_1: number[] = []
const default_cells = default_cells_1

for (let i = 0; i < total_size; ++i) {
    if (i % 3 === 0 || i % 7 === 0) {
        default_cells_1.push(i)
    }
}

type Type = 'js' | 'wasm-not-optimized'

interface MainProps {
    onPreDraw: () => void
    onPostDraw: () => void
}

const Main = ({ onPreDraw, onPostDraw }: MainProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const contextRef = useRef<CanvasRenderingContext2D | null>(null)
    const cellSizeXRef = useRef<number>(-1)
    const cellSizeYRef = useRef<number>(-1)
    const [started, setStarted] = useState(false)
    const [use, setUse] = useState<Type>('js')
    const debounce_state = useRef(0)

    const { game } = useMemo(() => {
        if (use === 'js') {
            return {
                game: new GameOfLife(x_size, y_size),
            }
        }

        return { game: start_game(x_size, y_size) }
    }, [use])

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
    }, [])

    const draw = useCallback(
        (muteDraw = false) => {
            if (!muteDraw) {
                debounce_state.current++

                if (
                    !debounce_number ||
                    debounce_state.current % debounce_number === 0
                ) {
                    const cell_size_x = cellSizeXRef.current
                    const cell_size_y = cellSizeYRef.current
                    const context = contextRef.current!
                    for (let i = 0; i < total_size; ++i) {
                        context.fillStyle = game.get_alive(i)
                            ? alive_color
                            : died_color

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
                }
            }

            if (started) {
                game.next_ticket()
            }
        },
        [started, game]
    )

    useEffect(() => {
        init()

        let rafId = 0

        const loop = () => {
            rafId = self.requestAnimationFrame(() => {
                onPreDraw()
                draw(mute_draw)
                onPostDraw()
                loop()
            })
        }

        loop()

        return () => {
            self.cancelAnimationFrame(rafId)
        }
    }, [game, started])

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
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
        },
        [game]
    )

    const handleStart = useCallback(() => {
        if (!started && !default_cells.length) {
            // @ts-ignore
            window.__cells = []

            for (let i = 0; i < total_size; ++i) {
                if (!game.get_alive(i)) {
                    continue
                }

                // @ts-ignore
                window.__cells.push(i)
            }
        }

        setStarted(!started)
    }, [started, game])

    const handleTypeChange = useCallback((type: Type) => {
        setUse(type)
    }, [])

    const handleLoad = useCallback(() => {
        // @ts-ignore
        ;(window.__cells || default_cells)?.forEach((i) =>
            game.set_alive(i, true)
        )
    }, [game])

    return (
        <div>
            <div className="handlers">
                <RadioGroup value={use} onChange={handleTypeChange}>
                    <Radio value="js">js</Radio>
                    <Radio value="wasm-not-optimized">wasm</Radio>
                </RadioGroup>

                <Button onClick={handleStart}>
                    {started ? 'stop' : 'start'}
                </Button>

                <Button onClick={handleLoad}>load</Button>
            </div>

            <div className="canvas-wrap">
                <canvas
                    className="canvas"
                    ref={canvasRef}
                    onMouseMove={handleMouseMove}
                />
            </div>

            <style jsx>{`
                .handlers {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }

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
        </div>
    )
}

export default function C() {
    const [frameDelta, setFrameDelta] = useState(0)

    let preDrawTime = 0

    const handlePreDraw = useCallback(() => {
        preDrawTime = performance.now()
    }, [])

    const handlePostDraw = useCallback(() => {
        const now = performance.now()
        setFrameDelta(+(now - preDrawTime).toFixed(2))
    }, [])

    return (
        <Layout>
            <div className="comp">
                <div className="workbench">
                    <div className="">
                        frame time: <span className="">{frameDelta} ms</span>
                    </div>

                    <div className="">
                        FPS:{' '}
                        <span className="">
                            {(1000 / frameDelta).toFixed(2)}
                        </span>
                    </div>
                </div>

                <Main onPreDraw={handlePreDraw} onPostDraw={handlePostDraw} />

                <style jsx>{`
                    .workbench {
                        padding: 0 16px;
                    }
                `}</style>
            </div>
        </Layout>
    )
}
