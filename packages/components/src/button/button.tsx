import React, { FC } from 'react'
import { ButtonProps } from './constants'
import c from 'classnames'

const Button: FC<ButtonProps> = (props) => {
  const { color = 'blue', onClick } = props
  return (
    <button
      className={c(
        props.className,
        'm-1',
        'py-2',
        'px-4',
        'font-semibold',
        'rounded-lg',
        'shadow-md',
        'text-white',
        'border-none',
        'cursor-pointer',
        `bg-${color}-500`,
        `hover:bg-${color}-700`
      )}
      onClick={onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
