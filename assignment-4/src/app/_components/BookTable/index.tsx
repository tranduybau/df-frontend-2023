'use client'

import React, { memo } from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import * as querystring from 'querystring'
import useBookStore from '../../../storages/bookStore'
import BookRow from '../BookRow'

import styles from './BookTable.module.scss'
import { BookType } from '../../../types/BookType'
import { TABLE_PAGE_SIZE } from '../../../constants/books'
import Pagination from '../../../components/Pagination'

const ModalAddBook = dynamic(
  () => import('../../../components/Modal/ModalAddBook'),
)
const ModalDeleteBook = dynamic(
  () => import('../../../components/Modal/ModalDeleteBook'),
)

interface BookTableProps {
  search: string
}

function BookTable(props: BookTableProps) {
  const { search } = props

  const router = useRouter()
  const searchParams = useSearchParams()

  const { books } = useBookStore()

  const [editingBook, setEditingBook] = React.useState<BookType | null>(null)
  const [deletingBook, setDeletingBook] = React.useState<BookType | null>(null)

  const filteredBooks = books.filter((book) => {
    return (
      book.name.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    )
  })
  const currentPage = Number(searchParams.get('page')) || 1
  const currentPageData = filteredBooks.slice(
    (currentPage - 1) * TABLE_PAGE_SIZE,
    currentPage * TABLE_PAGE_SIZE,
  )

  const totalPage = Math.ceil(filteredBooks.length / TABLE_PAGE_SIZE)

  const onChangePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const page = e.currentTarget.value

    const queries = querystring.parse(searchParams.toString())
    queries.page = page

    router.push(`${window.location.pathname}?${querystring.stringify(queries)}`)
  }

  const onSelectEditingBook = (book: BookType) => {
    setEditingBook(book)
  }

  const onSelectDeletingBook = (book: BookType) => {
    setDeletingBook(book)
  }

  const onCloseModal = () => {
    setDeletingBook(null)
    setEditingBook(null)
  }

  return (
    <>
      <table
        className={classNames(
          'table-books w-full bg-white dark:bg-black',
          styles.Table,
        )}
      >
        <colgroup>
          <col className="w-[25%]" />
          <col className="w-[25%]" />
          <col className="w-[25%]" />
          <col className="w-[25%]" />
        </colgroup>

        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Topic</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentPageData.map((book) => (
            <BookRow
              onSelectEditingBook={onSelectEditingBook}
              onSelectDeletingBook={onSelectDeletingBook}
              key={book.id}
              data={book}
            />
          ))}
        </tbody>
      </table>

      <div className="mt-[2rem] flex justify-center">
        <Pagination
          onChangePage={onChangePage}
          page={currentPage}
          total={totalPage}
        />
      </div>

      <ModalAddBook
        isShowModal={!!editingBook}
        onCloseModal={onCloseModal}
        defaultValue={editingBook}
      />

      <ModalDeleteBook
        onCloseModal={onCloseModal}
        book={deletingBook}
        isShowModal={!!deletingBook}
      />
    </>
  )
}

export default memo(BookTable)
