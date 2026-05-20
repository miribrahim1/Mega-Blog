import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {
                label &&
                <label
                    htmlFor={id}
                    className='inline-block pl-1 mb-1'
                    style={{color: 'black'}}
                    >
                    {label}
                </label>
            }
            <input
                type={type}
                className={`px-3 py-2 border rounded-lg bg-white text-black inline-none focus:bg-gray-500 duration-200 border-green-200 w-full ${className}`}
                id={id}
                ref={ref}
                {...props}
            />
        </div>
    )
})


export default Input