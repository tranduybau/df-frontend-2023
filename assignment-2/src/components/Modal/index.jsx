import React, {memo} from 'react'
import classNames from "classnames";
import ModalTypes from "../../constants/modalTypes";

function Modal({modalType, onAddBook, onCloseModal, selectedBook, onDeleteBook}) {
  return (<div id="modal" className={classNames("modal-container", !!modalType && "active")}>
    <div className="modal-overlay" onClick={onCloseModal}/>

    <div id="delete-book" className={classNames("modal-wrapper", modalType !== ModalTypes.DELETE && 'hidden')}>
      <button className="ghost close-btn" type="button" onClick={onCloseModal}>
        <img src="/images/close.svg" alt="Close" width="24" height="24"/>
      </button>

      <div className="text-center modal-title">
        Delete book
      </div>

      <div className="text-center flex flex-col content">
        <span>Do you want to delete</span>

        <span><b id="delete-book-title">
          {selectedBook?.name}
        </b> book?</span>
      </div>

      <div className="flex items-center justify-center delete-btn-group">
        <button className="ghost" type="button" id="delete-book-confirm-btn"
                onClick={onDeleteBook}>
          Delete
        </button>

        <button type="button" onClick={onCloseModal}>
          Cancel
        </button>
      </div>
    </div>

    <form id="add-book" className={classNames("modal-wrapper", modalType !== ModalTypes.ADD && 'hidden')} onSubmit={onAddBook}>
      <button className="ghost close-btn" type="button" onClick={onCloseModal}>
        <img src="/images/close.svg" alt="Close" width="24" height="24"/>
      </button>

      <div className="modal-title">
        Add book
      </div>

      <div className="flex flex-col form">
        <label>
                    <span className="label">
                        Name
                    </span>

          <input type="text" placeholder="Name" required name="name"/>
        </label>

        <label>
                    <span className="label">
                        Author
                    </span>

          <input type="text" placeholder="Author" required name="author"/>
        </label>

        <label>
                    <span className="label">
                        Topic
                    </span>

          <select name="topic" required defaultValue="Programming">
            <option value="Programming">Programming</option>
            <option value="Database">Database</option>
            <option value="DevOps">DevOps</option>
          </select>
        </label>
      </div>

      <div className="flex items-center justify-end delete-btn-group">
        <button type="submit">
          Create
        </button>
      </div>
    </form>
  </div>)
}

export default memo(Modal)
