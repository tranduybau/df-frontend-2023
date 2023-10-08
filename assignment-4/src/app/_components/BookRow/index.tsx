import React, { memo } from 'react'
import Link from 'next/link'
import { BookType } from '../../../types/BookType'
import AppButton, { ButtonVariant } from '../../../components/AppButton'
import PAGES from '../../../constants/pages'

interface BookRowProps {
  data: BookType
  onSelectEditingBook: (book: BookType) => void
  onSelectDeletingBook: (book: BookType) => void
}

function BookRow(props: BookRowProps) {
  const { data, onSelectEditingBook, onSelectDeletingBook } = props

  const onEditBook = () => {
    onSelectEditingBook(data)
  }

  const onDeleteBook = () => {
    onSelectDeletingBook(data)
  }

  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.author}</td>
      <td>{data.topic}</td>
      <td>
        <div className="flex gap-[1rem]">
          <Link href={PAGES.BOOK_DETAILS(data.id)}>
            <AppButton variant={ButtonVariant.TEXT}>View</AppButton>
          </Link>

          <AppButton
            variant={ButtonVariant.TEXT}
            value={data.id}
            onClick={onEditBook}
          >
            Edit
          </AppButton>

          <AppButton
            variant={ButtonVariant.TEXT}
            value={data.id}
            onClick={onDeleteBook}
          >
            Delete
          </AppButton>
        </div>
      </td>
    </tr>
  )
}

export default memo(BookRow)
