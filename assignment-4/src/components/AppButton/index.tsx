import React, { useMemo } from 'react'
import classNames from 'classnames'

export enum ButtonVariant {
  DEFAULT = 'default',
  TEXT = 'text',
  OUTLINE = 'outline',
}

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export default function AppButton(props: AppButtonProps) {
  const {
    children,
    onClick,
    value,
    className,
    variant = ButtonVariant.DEFAULT,
    disabled,
    ...others
  } = props

  const defaultClassName = useMemo(() => {
    switch (variant) {
      case ButtonVariant.TEXT: {
        return 'text-red-500 underline'
      }

      case ButtonVariant.OUTLINE: {
        return 'text-red-500 border-2 border-red-500 bg-white dark:bg-dark min-h-[2.5rem] px-[1.5rem] rounded-[0.25rem] hover:opacity-80'
      }

      default: {
        return 'bg-red-500 text-white dark:text-black min-h-[2.5rem] px-[1.5rem] rounded-[0.25rem]'
      }
    }
  }, [variant])

  const onClickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <button
      value={value}
      onClick={onClickBtn}
      className={classNames(
        'transition',
        defaultClassName,
        className,
        disabled && 'cursor-not-allowed opacity-50',
      )}
      disabled={disabled}
      {...others}
    >
      {children}
    </button>
  )
}
