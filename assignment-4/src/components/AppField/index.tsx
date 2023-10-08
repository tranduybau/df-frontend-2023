import React from 'react'
import classNames from 'classnames'
import randomId from '../../helpers/utils/randomId'

interface AppFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isShowLabel?: boolean
  label?: string
  errors?: string[]
}

export default function AppField(props: AppFieldProps) {
  const {
    id,
    name,
    isShowLabel,
    label,
    className,
    errors = [],
    ...others
  } = props

  return (
    <label htmlFor={id} className="flex flex-col gap-[0.25rem]">
      {isShowLabel && <span>{label}</span>}

      <input
        id={id}
        className={classNames(
          'border bg-white min-h-[2.5rem] px-[0.5rem] rounded-[0.25rem]',
          className,
        )}
        name={name}
        {...others}
      />

      {!!errors.length && (
        <small className="whitespace-pre text-red-400 mx-[0.5rem]">
          {errors.map((err) => (
            <span key={err + randomId()}>{`${err}\n`}</span>
          ))}
        </small>
      )}
    </label>
  )
}
