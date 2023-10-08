'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useBoolean } from 'usehooks-ts'
import useBookStore from '../../../storages/bookStore'
import { BookType } from '../../../types/BookType'
import PAGES from '../../../constants/pages'
import AppButton, { ButtonVariant } from '../../../components/AppButton'
import ModalAddBook from '../../../components/Modal/ModalAddBook'
import ModalDeleteBook from '../../../components/Modal/ModalDeleteBook'

interface BookPageProps {
  params: {
    id: string
  }
}

export default function BookPage({ params }: BookPageProps) {
  const router = useRouter()
  const { getBook } = useBookStore()

  const {
    value: isShowModalEdit,
    setTrue: onShowModalEdit,
    setFalse: onHideModalEdit,
  } = useBoolean()

  const {
    value: isShowModalDelete,
    setTrue: onShowModalDelete,
    setFalse: onHideModalDelete,
  } = useBoolean()

  const [book, setBook] = useState<BookType | null>(null)

  useEffect(() => {
    const data = getBook(params.id)

    if (!data) {
      router.push(PAGES['404'])
    } else {
      setBook(data)
    }
  }, [params.id, isShowModalEdit]) // eslint-disable-line

  if (!book) {
    return null
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="py-[3rem] flex flex-col gap-[1rem]">
          <Link href={PAGES.HOME}>
            <AppButton
              variant={ButtonVariant.TEXT}
              className="flex items-center"
            >
              <ChevronLeft />

              <span>Back</span>
            </AppButton>
          </Link>

          <h1>{book.name}</h1>

          <div>
            <b>Author:</b> <span>{book.author}</span>
          </div>

          <div>
            <b>Author:</b> <span>{book.author}</span>
          </div>

          <div>
            <b>Topic:</b> <span>{book.topic}</span>
          </div>

          <div className="flex gap-[1rem]">
            <AppButton onClick={onShowModalEdit}>Edit</AppButton>

            <AppButton onClick={onShowModalDelete}>Delete</AppButton>
          </div>
        </div>
      </div>

      <ModalAddBook
        isShowModal={isShowModalEdit}
        onCloseModal={onHideModalEdit}
        defaultValue={book}
      />

      <ModalDeleteBook
        onCloseModal={onHideModalDelete}
        book={book}
        isShowModal={isShowModalDelete}
        isRedirect
      />
    </>
  )
}
