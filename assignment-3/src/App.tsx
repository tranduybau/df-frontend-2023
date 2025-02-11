import React, {useEffect, useState} from "react";
import classNames from "classnames";

import AppHeader from "./components/layout/AppHeader";
import Modal from "./components/Modal";
import books from "./faker/books";

import './App.css';
import Pagination from "./components/Pagination";
import Theme from "./types/theme";
import ModalType from "./types/modal";
import BookType from "./types/book";

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    let localTheme = localStorage.getItem('theme')
    localTheme = localTheme ? JSON.parse(localTheme) : Theme.LIGHT

    return localTheme as Theme
  })

  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [listBooks, setListBooks] = useState<BookType[]>(() => {
    const localBooks = localStorage.getItem('books')
    const formattedBooks = localBooks ? JSON.parse(localBooks) : []
    return localBooks?.length ? (formattedBooks as BookType[]) : books
  });
  const [selectedBook, setSelectedBook] = useState<null | BookType>(null);
  const [page, setPage] = useState(() => {
    let localPage = localStorage.getItem('page')
    localPage = localPage ? JSON.parse(localPage) : 1
    return +(localPage as string)
  });

  const currentList = listBooks.slice((page - 1) * 5, page * 5);

  const onChangePage = (event) => {
    const newPage = Number(event.target.value) || 1;
    localStorage.setItem('page', JSON.stringify(newPage));
    setPage(newPage);
  }

  const onToggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    localStorage.setItem('theme', JSON.stringify(newTheme))
    setTheme(newTheme)
  }

  const onCloseModal = () => {
    setSelectedBook(null)
    setModalType(null)
  }

  const onOpenModalAddBook = () => {
    setModalType(ModalType.ADD);
  }

  const onAddBook = (event) => {
    event.preventDefault();
    const form = event.target.elements
    const newBooks = {
      author: form.author.value,
      name: form.name.value,
      topic: form.topic.value,
      id: Math.random().toString(36).substr(2, 9)
    }

    setListBooks([...listBooks, newBooks]);
    onCloseModal()
    event.target.reset()
  }

  const onOpenModalDeleteBook = (event) => {
    const id = event.target.value;
    const book = listBooks.find(book => String(book.id) === String(id));

    if (book) {
      setModalType(ModalType.DELETE);
      setSelectedBook(book);
    } else {
      alert('Book not found!');
    }
  }

  const onDeleteBook = () => {
    setListBooks(listBooks.filter(book => String(book.id) !== String(selectedBook!.id)));
    onCloseModal()
  }

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(listBooks));
  }, [listBooks])

  return (<div className={classNames("App", theme === Theme.DARK && 'dark')}>
    <AppHeader theme={theme} onToggleTheme={onToggleTheme} />

    <div className="container">
      <div className="flex items-center justify-end search-container">
        <label htmlFor="search-input">
          <input type="text" placeholder="Search books" id="search-input"/>
        </label>

        <button id="add-book-btn" type="button" onClick={onOpenModalAddBook}>
          Add book
        </button>
      </div>
      <table className="table-books w-full">
        <colgroup>
          <col className="col-name"/>
          <col className="col-author"/>
          <col className="col-topic"/>
          <col className="col-action"/>
        </colgroup>

        <thead>
        <tr>
          <th>Name</th>
          <th>Author</th>
          <th>Topic</th>
          <th>Action</th>
        </tr>
        </thead>

        <tbody id="book-list">
        {currentList.map((book) => (<tr key={book.id}>
          <td>{book.name}</td>
          <td>{book.author}</td>
          <td>{book.topic}</td>
          <td>
            <button className="link-btn delete-book" value={book.id} onClick={onOpenModalDeleteBook}>
              Delete
            </button>
          </td>
        </tr>))}
        </tbody>
      </table>

      <div>
        <Pagination page={page} total={listBooks.length} onChangePage={onChangePage} />
      </div>

      <Modal
        modalType={modalType}
        onAddBook={onAddBook}
        onCloseModal={onCloseModal}
        selectedBook={selectedBook}
        onDeleteBook={onDeleteBook}
      />
    </div>
  </div>);
}

export default App;
