import React from 'react'
import classNames from 'classnames'

interface AppSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  isShowLabel?: boolean
  label?: string

  data: string[]

  errors?: string[]
}

export default function AppSelect(props: AppSelectProps) {
  const {
    id,
    name,
    isShowLabel,
    label,
    className,
    value,
    data,
    errors = [],
    ...others
  } = props

  return (
    <label className="flex flex-col gap-[0.25rem]" htmlFor={id}>
      {isShowLabel && <span>{label}</span>}

      <select
        className={classNames(
          'border bg-white min-h-[2.5rem] px-[0.5rem] rounded-[0.25rem]',
          className,
        )}
        required
        name={name}
        id={id}
        value={value}
        {...others}
      >
        {data.map((item) => (
          <option key={`${name}-${item}`} value={item}>
            {item}
          </option>
        ))}
      </select>

      {!!errors.length && (
        <small className="whitespace-pre text-red-400 mx-[0.5rem]">
          {errors.map((err) => (
            <span key={err}>{`${err}\n`}</span>
          ))}
        </small>
      )}
    </label>
  )
}
