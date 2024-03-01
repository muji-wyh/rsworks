import React from 'react'

export const Tips = ({ children }: React.PropsWithChildren) => {
    return (
        <div className="tips">
            {children}

            <style jsx>{`
                .tips {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: rgba(0, 0, 0, 0.2);
                    font-size: 26px;
                    font-weight: bold;
                }
            `}</style>
        </div>
    )
}
