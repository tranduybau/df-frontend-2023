import React, { useEffect, useState } from 'react'
import { typeToFlattenedError } from 'zod'
import AppField from '../../AppField'
import AppSelect from '../../AppSelect'
import ModalWrapper from '../ModalWrapper'
import { BookType } from '../../../types/BookType'
import { defaultForm, formSchema } from './formSchema'
import AppButton from '../../AppButton'
import useBookStore from '../../../storages/bookStore'
import randomId from '../../../helpers/utils/randomId'

interface ModalAddBookProps {
  isShowModal: boolean
  onCloseModal: () => void
  defaultValue: BookType | null
}

export default function ModalAddBook(props: ModalAddBookProps) {
  const { isShowModal, onCloseModal, defaultValue } = props

  const { onAddBook, onUpdateBook } = useBookStore()

  const [form, setForm] = useState<BookType>(
    JSON.parse(JSON.stringify({ ...defaultForm, id: randomId() })),
  )
  const [errors, setErrors] = useState<typeToFlattenedError<BookType, string>>()

  const onChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validator = formSchema.safeParse(form)

    if (validator.success) {
      if (defaultValue) {
        onUpdateBook(form)
      } else {
        onAddBook(form)
      }

      onCloseModal()

      setForm(JSON.parse(JSON.stringify({ ...defaultForm, id: randomId() })))
    } else {
      const errors = validator.error.formErrors

      setErrors(errors)
    }
  }

  useEffect(() => {
    if (defaultValue) {
      setForm(defaultValue)
    }
  }, [defaultValue, isShowModal])

  return (
    <ModalWrapper isShowModal={isShowModal} onCloseModal={onCloseModal}>
      <form onSubmit={onSubmit} className="text-black">
        <h2 className="text-[1.5rem]/[3rem] font-semibold uppercase mb-[1.5rem]">
          Add book
        </h2>

        <div className="flex flex-col gap-[1rem]">
          <AppField
            isShowLabel
            label="Name"
            type="text"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={onChange}
            errors={errors?.fieldErrors.name}
          />

          <AppField
            isShowLabel
            label="Author"
            type="text"
            placeholder="Author"
            name="author"
            value={form.author}
            onChange={onChange}
          />

          <AppSelect
            name="topic"
            isShowLabel
            value={form.topic}
            label="Topic"
            data={['Programming', 'Database', 'DevOps']}
            onChange={onChange}
          />
        </div>

        <AppButton className="mt-[2rem] w-full !text-white" type="submit">
          Create
        </AppButton>
      </form>
    </ModalWrapper>
  )
}
