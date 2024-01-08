(module
    (func $i (import "imports" "log") (param i32))
    (func (export "log") i32.const 42 call $i )
)