import React from 'react'

export const DemoBlock = ({
    children,
    tips,
}: React.PropsWithChildren<{ tips?: React.ReactNode }>) => {
    return (
        <>
            <div className="demo">
                {tips && <div className="title">{tips}</div>}
                {children}
            </div>

            <style jsx>{`
                .title {
                    color: #aaa;
                    font-size: 18px;
                    margin-bottom: 20px;
                    font-style: italic;
                }

                .demo {
                    margin-bottom: 40px;
                    padding: 16px;
                    background: #f9f9f9;
                }
            `}</style>
        </>
    )
}
