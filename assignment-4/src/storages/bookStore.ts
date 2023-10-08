import { create } from 'zustand'
import { BookType } from '../types/BookType'
import { LocalStorageKeys } from '../constants/keys'
import defaultBooks from '../constants/books'

interface BookStore {
  isFetchedBooks: boolean

  books: BookType[]
  getBooks: () => void

  getBook: (id: string) => BookType | null

  onAddBook: (book: BookType) => boolean
  onUpdateBook: (book: BookType) => boolean
  onRemoveBook: (book: BookType) => boolean
}

const useBookStore = create<BookStore>((set, get) => ({
  isFetchedBooks: false,
  books: [],
  getBooks: () => {
    try {
      const books =
        (JSON.parse(
          localStorage.getItem(LocalStorageKeys.BOOKS) || '[]',
        ) as BookType[]) || []

      set({
        books: books.length ? books : defaultBooks,
      })

      localStorage.setItem(LocalStorageKeys.BOOKS, JSON.stringify(books))
    } catch (error) {
      set({
        books: [],
      })
    } finally {
      set({
        isFetchedBooks: true,
      })
    }
  },
  getBook: (id: string) => {
    try {
      const book = get().books.find((item) => String(item.id) === id)

      if (book) {
        return book
      }

      throw new Error('Book not found')
    } catch (error) {
      return null
    }
  },
  onAddBook: (book: BookType) => {
    let isAddedBook = false
    try {
      const books = JSON.parse(JSON.stringify(get().books))

      set({
        books: [...books, book],
      })

      localStorage.setItem(
        LocalStorageKeys.BOOKS,
        JSON.stringify([...books, book]),
      )

      isAddedBook = true
    } catch (error) {
      // Alert error
    }

    return isAddedBook
  },
  onRemoveBook: (book) => {
    let isRemovedBook = false
    try {
      const books = JSON.parse(JSON.stringify(get().books))
      const newList = books.filter((item) => item.id !== book.id)

      set({
        books: newList,
      })

      localStorage.setItem(LocalStorageKeys.BOOKS, JSON.stringify(newList))

      isRemovedBook = true
    } catch (e) {
      // Alert error
    }

    return isRemovedBook
  },
  onUpdateBook: (book: BookType) => {
    let isUpdatedBook = false

    try {
      const books = JSON.parse(JSON.stringify(get().books))
      const index = books.findIndex((item) => item.id === book.id)

      books[index] = book

      set({
        books,
      })

      localStorage.setItem(LocalStorageKeys.BOOKS, JSON.stringify(books))

      isUpdatedBook = true
    } catch (e) {
      // Alert error
    }

    return isUpdatedBook
  },
}))

export default useBookStore
