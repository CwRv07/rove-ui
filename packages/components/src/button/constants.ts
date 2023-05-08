enum BG_COLOR {
  'red',
  'blue',
  'green',
  'yellow',
  'gray',
  'pink'
}

export interface ButtonProps {
  color?: keyof typeof BG_COLOR

  className?: 'string'
  children?: React.ReactNode

  onClick?: React.MouseEventHandler<HTMLButtonElement>
}
