import React, { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import ModalWrapper from '../ModalWrapper'
import { BookType } from '../../../types/BookType'
import AppButton, { ButtonVariant } from '../../AppButton'
import useBookStore from '../../../storages/bookStore'
import PAGES from '../../../constants/pages'

interface ModalAddBookProps {
  isShowModal: boolean
  onCloseModal: Dispatch<SetStateAction<BookType | null>>
  book: BookType | null
  isRedirect?: boolean
}

export default function ModalDeleteBook(props: ModalAddBookProps) {
  const router = useRouter()

  const { isShowModal, onCloseModal, book, isRedirect = false } = props

  const { onRemoveBook } = useBookStore()

  const onSubmit = () => {
    onRemoveBook(book as BookType)
    onCloseModal(null)

    if (isRedirect) {
      router.push(PAGES.HOME)
    }
  }

  const onClose = () => {
    onCloseModal(null)
  }

  return (
    <ModalWrapper isShowModal={isShowModal} onCloseModal={onClose}>
      <form className="text-black">
        <h2 className="text-[1.5rem]/[3rem] font-semibold uppercase mb-[1.5rem]">
          Delete book
        </h2>

        <div className="">
          Do you want to delete the <b>{book?.name}</b>?
        </div>

        <div className="mt-[2rem] flex gap-[1rem]">
          <AppButton
            className="flex-1"
            variant={ButtonVariant.OUTLINE}
            onClick={onSubmit}
            type="button"
          >
            Delete
          </AppButton>

          <AppButton
            className="flex-1 !text-white"
            onClick={onClose}
            type="button"
          >
            Cancel
          </AppButton>
        </div>
      </form>
    </ModalWrapper>
  )
}
