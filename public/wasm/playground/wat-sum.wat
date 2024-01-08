;; 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
(module
    (memory (import "js" "mem") 1)
    (func
        (export "accumulate") (param $ptr i32) (param $len i32) (result i32)
        (local $end i32)
        (local $sum i32)
        (local.set $end
            (i32.add
                (local.get $ptr)
                (i32.mul
                    (local.get $len)
                    (i32.const 4)
                )
            )
        )
        (block $break
            (loop $top
                (br_if $break
                    (i32.eq
                        (local.get $ptr)
                        (local.get $end)
                    )
                )
                (local.set $sum
                    (i32.add
                        (local.get $sum)
                        (i32.load
                            (local.get $ptr)
                        )
                    )
                )

                (local.set $ptr
                    (i32.add
                        (local.get $ptr)
                        (i32.const 4)
                    )
                )

                (br $top)
            )
        )

        (local.get $sum)
    )
)