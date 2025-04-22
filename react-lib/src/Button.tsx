import * as React from 'react'

interface IButtonProps {
  /**
   * The content to display inside the button.
   */
  children: React.ReactNode
  /**
   * Optional click handler
   */
  onClick?: () => void
}

/**
 * A simple button component.
 */
export const Button = ({ children, onClick }: IButtonProps) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  )
}
