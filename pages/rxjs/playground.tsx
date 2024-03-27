'use client'

import React, {
    Ref,
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import Layout from '@/app/components/Layout'
import { connectable, of, from, Subject, interval, BehaviorSubject } from 'rxjs'
import { tap, take } from 'rxjs/operators'
import { Tips } from '@/app/components/Tips'

// todo 抽取 type List::Item

const win = []

enum blackAndWhite {
    blackAndWhite = 'blackAndWhite',
    sepia = 'sepia',
}

const myFetch = async (): Promise<{ label: string }[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                Array(20)
                    .fill(null)
                    .map((ai, i) => ({
                        label: `${i}-${Math.random()}`,
                    }))
            )
        }, 200)
    })
}

// todo 开始的时候就触底
// 滚动时触底
// 距离底部 x px 触发
// throttle
// 临时禁用(loading)
// 失败重试？
const useReachBottom = ({
    scrollWrap,
    trigger,
}: {
    scrollWrap: RefObject<HTMLDivElement>
    trigger: () => void
}) => {
    win.push(scrollWrap.current)

    const handler = useCallback(() => {
        // check if scrolled to the end

        const cur = scrollWrap.current

        if (!cur) {
            return
        }

        if (cur.scrollHeight - cur.clientHeight - 1 >= cur.scrollTop) {
            // not reach end
            return
        }

        trigger()
    }, [])

    useEffect(() => {
        const cur = scrollWrap.current

        if (!cur) {
            return
        }

        cur.addEventListener('scroll', handler)

        return () => {
            console.log('unmount')
            cur.removeEventListener('scroll', handler)
        }
    }, [])
}

export default function C() {
    /**
     第二题：

     给定一组点云数据（在二维空间中），实现一个函数，该函数接受一个查询点和一个整数k作为参数，并返回距离该查询点最近的k个点。

     示例输入：

     点云数据：[[1, 2], [2, 3], [3, 4], [5, 5], [1, -1]]
     查询点：[2, 2]



     2 * n + 1
     2 * n + 2
     Math.floor((n - 1) / 2)

     k = 3
     示例输出：

     [[1, 2], [2, 3], [3, 4]]
     要求：

     可以假设所有输入都是有效的。
     如果有多个点与查询点的距离相同，则返回任意k个这样的点。
     */

    type P = [number, number]

    const dis = (p1: P, p2: P) => {
        //
        return 0
    }

    const left = (n: number) => 2 * n + 1

    const right = (n: number) => 2 * n + 2

    const root = (n: number) => Math.floor((n - 1) / 2)

    type Node = {
        dis: number
        cord: P
    }

    /**
     *  [root] 0
     *      [c1] 1     [c2] 2
     *      [] []
     */
    const process1 = (heap: Node[], node: Node) => {
        // todo
    }

    const process = (ary: P[], point: P, k: number) => {
        const heap = Array(ary.length)

        ary.forEach((p, i) => {
            const distance = dis(p, point)
            process1(heap, { dis: distance, cord: p })
        })

        return heap
    }

    const [list, setList] = useState<{ label: string }[]>(
        Array(20)
            .fill(null)
            .map((ai, i) => ({
                label: `${i}------`,
            }))
    )

    const [loading, setLoading] = useState(false)

    const scrollWrapRef = useRef(null)

    // 触底检测
    useReachBottom({
        scrollWrap: scrollWrapRef,
        trigger: async () => {
            const nextList = await myFetch()

            // todo loading

            setList((prev) => prev.concat(nextList))
            // setList(list.concat(nextList))
        },
    })

    return (
        <Layout>
            <Tips>rxjs playground</Tips>

            <div className="wrap" ref={scrollWrapRef}>
                <ul className="ul">
                    {list.map(({ label }, i) => (
                        <li key={label} className="li">
                            {i}-----{label}
                        </li>
                    ))}
                </ul>
            </div>

            <style jsx>{`
                .wrap {
                    background: tan;
                    height: 80vh;
                    overflow-y: auto;
                }

                .ul {
                    margin: 0;
                    padding: 0;
                }

                .li {
                    margin: 10px 0 0;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    list-style: none;
                    width: 100%;
                    height: 30px;
                }
            `}</style>
        </Layout>
    )
}
