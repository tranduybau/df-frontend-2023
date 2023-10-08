'use client'

import React, { useEffect, useState } from 'react'
import { useBoolean, useDebounce } from 'usehooks-ts'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import * as querystring from 'querystring'
import AppButton from '../components/AppButton'
import AppField from '../components/AppField'

const BookTable = dynamic(() => import('./_components/BookTable'))
const ModalAddBook = dynamic(() => import('../components/Modal/ModalAddBook'))

export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const {
    value: isShowModalAddBook,
    setTrue: onShowModalAddBook,
    setFalse: onHideModalAddBook,
  } = useBoolean()

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce<string>(search, 300)

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    const urlSearch = querystring.parse(searchParams.toString())?.search

    if (urlSearch) {
      setSearch(urlSearch as string)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (debouncedSearch === search) {
      const queries = querystring.parse(searchParams.toString())

      if (debouncedSearch) {
        queries.search = debouncedSearch
      } else {
        delete queries.search
      }

      router.push(
        `${window.location.pathname}?${querystring.stringify(queries)}`,
      )
    }
  }, [debouncedSearch]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-end py-10">
        <AppField
          type="text"
          placeholder="Search books"
          className="rounded-r-none"
          onChange={onChangeSearch}
          value={search}
        />

        <AppButton onClick={onShowModalAddBook} className="rounded-l-none">
          Add book
        </AppButton>
      </div>

      <BookTable search={debouncedSearch} />

      <ModalAddBook
        isShowModal={isShowModalAddBook}
        onCloseModal={onHideModalAddBook}
        defaultValue={null}
      />
    </div>
  )
}
