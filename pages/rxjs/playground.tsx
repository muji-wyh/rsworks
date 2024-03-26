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
