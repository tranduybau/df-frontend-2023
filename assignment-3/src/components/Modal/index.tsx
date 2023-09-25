import React, {memo} from 'react'
import classNames from "classnames";
import {X} from "lucide-react";
import ModalType from "../../types/modal";

function Modal({modalType, onAddBook, onCloseModal, selectedBook, onDeleteBook}) {
  return (<div id="modal" className={classNames("modal-container", !!modalType && "active")}>
    <button onClick={onCloseModal}>
      <div className="modal-overlay" />
    </button>

    <div id="delete-book" className={classNames("modal-wrapper", modalType !== ModalType.DELETE && 'hidden')}>
      <button className="ghost close-btn" type="button" onClick={onCloseModal}>
        <X />
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
        <button className="ghost" type="button" id="delete-book-confirm-btn" onClick={onDeleteBook}>
          Delete
        </button>

        <button type="button" onClick={onCloseModal}>
          Cancel
        </button>
      </div>
    </div>

    <form id="add-book" className={classNames("modal-wrapper", modalType !== ModalType.ADD && 'hidden')} onSubmit={onAddBook}>
      <button className="ghost close-btn" type="button" onClick={onCloseModal}>
        <X />
      </button>

      <div className="modal-title">
        Add book
      </div>

      <div className="flex flex-col form">
        <label htmlFor="name">
          <span className="label">
            Name
          </span>

          <input type="text" placeholder="Name" required name="name"/>
        </label>

        <label htmlFor="author">
          <span className="label">
              Author
          </span>

          <input type="text" placeholder="Author" required name="author"/>
        </label>

        <label htmlFor="topic">
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
