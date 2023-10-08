import React, { memo } from 'react'
import AppButton, { ButtonVariant } from '../AppButton'
import PaginationItem from './Item'

interface PaginationProps {
  page: number
  total: number
  onChangePage: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function Pagination(props: PaginationProps) {
  const { page, total, onChangePage } = props

  if (total <= 1) {
    return null
  }

  return (
    <div>
      <AppButton
        disabled={page === 1}
        onClick={onChangePage}
        value={page - 1}
        variant={ButtonVariant.TEXT}
      >
        Prev
      </AppButton>

      {Array.from({ length: total }).map((_, i) => (
        <PaginationItem
          total={total}
          onChangePage={onChangePage}
          index={i + 1}
          key={i}
          currentPage={page}
        />
      ))}

      <AppButton
        disabled={page === total}
        onClick={onChangePage}
        value={page + 1}
        variant={ButtonVariant.TEXT}
      >
        Next
      </AppButton>
    </div>
  )
}

export default memo(Pagination)
