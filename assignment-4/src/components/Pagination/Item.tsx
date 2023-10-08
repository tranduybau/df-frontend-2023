import React from 'react'
import AppButton, { ButtonVariant } from '../AppButton'

import styles from './Pagination.module.scss'

interface PaginationItemProps {
  index: number
  currentPage: number
  total: number
  onChangePage: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function PaginationItem(props: PaginationItemProps) {
  const { index, currentPage, total, onChangePage } = props

  switch (true) {
    case index === currentPage:
    case index >= 1 && index <= 3:
    case index >= total - 2:
    case index >= currentPage - 2 && index <= currentPage + 2:
      return (
        <AppButton
          variant={ButtonVariant.TEXT}
          onClick={onChangePage}
          value={index}
          disabled={currentPage === index}
          className="px-[0.5rem] mx-[0.5rem]"
        >
          {Number(index)}
        </AppButton>
      )

    default: {
      return <span className={styles.Empty} />
    }
  }
}

export default PaginationItem
