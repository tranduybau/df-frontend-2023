// Your JS code goes here
const initValue = [
    {
        id: 1,
        name: 'Refactoring',
        author: 'Martin Fowler',
        topic: 'Programming',
    },
    {
        id: 2,
        name: 'Designing Data-Intensive Applications',
        author: 'Martin Kleppmann',
        topic: 'Database',
    },
    {
        id: 3,
        name: 'The Phoenix Project',
        author: 'Gene Kim',
        topic: 'DevOps',
    }
]

const storedBooks = JSON.parse(localStorage.getItem('books')) || initValue
let selectedBookId = null
let query = ''

const bookRow = (data) => `
<tr>
            <td>${data.name}</td>
            <td>${data.author}</td>
            <td>${data.topic}</td>
            <td>
                <button class="link-btn delete-book" value="${data.id}" onclick="handleOpenModal('delete', event)">
                    Delete
                </button>
            </td>
        </tr>
`

function renderBooks(books) {
    const tbody = document.getElementById('book-list')

    tbody.innerHTML = books.filter(book => book.name.toLowerCase().includes(query.toLowerCase())).map(bookRow).join(' ')
}

function handleDeleteBook() {
    const books = JSON.parse(localStorage.getItem('books')) || initValue
    const newBooks = books.filter(book => String(book.id) !== String(selectedBookId))

    localStorage.setItem('books', JSON.stringify(newBooks))
    renderBooks(newBooks)
    handleCloseModal()
}

function handleOpenModal(type, event) {
    const modal = document.getElementById('modal')
    const deleteBook = document.getElementById('delete-book')
    const addBook = document.getElementById('add-book')

    if (type === 'delete') {
        const theBookId = event.target.value
        const theBook = storedBooks.find(book => String(book.id) === String(theBookId))

        if (theBook) {
            selectedBookId = theBook.id
            modal.classList.add('active')
            deleteBook.classList.remove('hidden')
            addBook.classList.add('hidden')
            document.getElementById('delete-book-title').innerText = theBook.name
        } else {
            alert('Book not found!')
        }
    } else {
        modal.classList.add('active')
        deleteBook.classList.add('hidden')
        addBook.classList.remove('hidden')
    }
}

function handleCloseModal() {
    const modal = document.getElementById('modal')
    modal.classList.remove('active')
}

function handleAddBook(event) {
    event.preventDefault()
    const form = event.target.elements
    const newBooks = {
        author: form.author.value,
        name: form.name.value,
        topic: form.topic.value,
        id: Math.random().toString(36).substr(2, 9)
    }

    storedBooks.push(newBooks)
    localStorage.setItem('books', JSON.stringify(storedBooks))
    renderBooks(storedBooks)
    event.target.reset()
    handleCloseModal()
}

renderBooks(storedBooks)

// Update query
document.getElementById('search-input').addEventListener('input', (e) => {
    query = e.target.value
    renderBooks(storedBooks)
})