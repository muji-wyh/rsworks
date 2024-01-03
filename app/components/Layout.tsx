import React, { useMemo } from 'react'
import { Menu, Dropdown, Button } from '@byted-image/lv-components'
import { IconDown } from '@byted-image/lv-components/icon'
import Link from 'next/link'
import '@byted-image/lv-components/dist/css/arco.css'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

export default function Layout({ children }: { children: any }) {
    const menuList = useMemo(
        () =>
            [
                ['mobx', [<Link href="/mobx/playground">playground</Link>]],

                [
                    'rxjs',
                    [
                        <Link href="/rxjs/playground">playground</Link>,
                        <Link href="/rxjs/autocomplete">autocomplete</Link>,
                    ],
                ],

                [
                    'wasm',
                    [
                        <Link href="/wasm/playground">playground</Link>,
                        <Link href="/wasm/gameOfLife">gameOfLife</Link>,
                    ],
                ],

                ['webgpu', [<Link href="/webgpu/playground">playground</Link>]],

                ['three', [<Link href="/three/playground">playground</Link>]],

                ['cv', [<Link href="/cv/playground">playground</Link>]],

                ['hooks', [<Link href="/hooks/playground">hooks</Link>]],
            ] as [label: string, subs: any[]][],
        []
    )

    return (
        <>
            {menuList.map(([label, routers]) => (
                <Dropdown
                    key={label}
                    trigger="hover"
                    droplist={
                        <Menu>
                            {routers.map((link, outerIndex) => (
                                <MenuItem key={outerIndex.toString()}>
                                    {link}
                                </MenuItem>
                            ))}
                        </Menu>
                    }
                    position="bl"
                >
                    <Button type="text">
                        {label}
                        <IconDown />
                    </Button>
                </Dropdown>
            ))}

            {children}
        </>
    )
}
