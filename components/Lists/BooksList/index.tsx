import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FaTrash, FaPen } from 'react-icons/fa';
import axios from 'axios';

import { BOOK_SHELF_API_ENDPOINT } from '../../../constants/envs';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getBooks, setBooks } from '../../../store/slices/books';

import styles from './styles.module.css';
import { SelectedToEditType, SelectedToViewType } from './types';
import Modal from '../../Modal';

const BooksList = () => {
  const dispatch = useAppDispatch();
  const { data, status, filtered } = useAppSelector(({ books }) => books);
  const isAvailable = filtered.length > 0 && status === 'succeeded';

  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [selectedToEdit, setSelectedToEdit] = useState<
    SelectedToEditType | undefined
  >();
  const [selectedToView, setSelectedToView] = useState<
    SelectedToViewType | undefined
  >();
  const [toUpdateName, setToUpdateName] = useState('');
  const [toUpdateISBNNo, setToUpdateISBNNo] = useState('');
  const [toUpdateAuthorId, setToUpdateAuthorId] = useState();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleDeleteItem = async (id: number) => {
    try {
      const dataDelete = await axios.delete(
        `${BOOK_SHELF_API_ENDPOINT}/books/${id}`
      );

      if (dataDelete.data.statusCode === 200) {
        const dataGet = await axios.get(`${BOOK_SHELF_API_ENDPOINT}/books`);

        if (dataGet.data.statusCode === 200) {
          dispatch(setBooks(dataGet.data.results));

          dispatch(getBooks());
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickEditButton = (row: any) => {
    setIsEditing(true);
    setSelectedToEdit(row);
    setToUpdateISBNNo(row.isbn_no);
    setToUpdateName(row.name);
    setToUpdateAuthorId(row.author.id);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      name: toUpdateName,
      isbn_no: toUpdateISBNNo,
      author: {
        id: toUpdateAuthorId,
      },
    };

    const dataPut = await axios.put(
      `${BOOK_SHELF_API_ENDPOINT}/books/${selectedToEdit.id}`,
      body
    );

    if (dataPut.data.statusCode === 200) {
      onClose();
      dispatch(getBooks());
    }
  };

  const onClose = () => {
    setIsEditing(false);
    setSelectedToEdit(undefined);
    setToUpdateISBNNo('');
    setToUpdateName('');
  };

  const onChangeEditNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setToUpdateName(e.currentTarget.value);
  };

  const onChangeEditISBNNoInput = (e: ChangeEvent<HTMLInputElement>) => {
    setToUpdateISBNNo(e.currentTarget.value);
  };

  const onViewDetails = (state: boolean, data: SelectedToEditType) => {
    setIsViewing(state);
    setSelectedToView(data);
  };

  const onCloseViewModal = () => {
    onViewDetails(false, undefined);
  };

  return (
    <>
      {isViewing && (
        <Modal
          title={`${selectedToView.name} Details`}
          onClose={onCloseViewModal}
        >
          <div className={styles.formSection}>
            <label htmlFor={`id-${selectedToView.id}`} className={styles.label}>
              Id
            </label>
            <p id={`id-${selectedToView.id}`} className={styles.formP}>
              {selectedToView.id}
            </p>
          </div>
          <div className={styles.formSection}>
            <label
              htmlFor={`name-${selectedToView.id}`}
              className={styles.label}
            >
              Name
            </label>
            <p id={`name-${selectedToView.id}`} className={styles.formP}>
              {selectedToView.name}
            </p>
          </div>
          <div className={styles.formSection}>
            <label
              htmlFor={`isbn_no-${selectedToView.id}`}
              className={styles.label}
            >
              ISBN No
            </label>
            <p id={`isbn_no-${selectedToView.id}`} className={styles.formP}>
              {selectedToView.isbn_no}
            </p>
          </div>
        </Modal>
      )}
      {isEditing && (
        <Modal title={`Edit ${selectedToEdit.name}`} onClose={onClose}>
          <form className={styles.form} onSubmit={onSubmit}>
            <input
              name="name"
              placeholder="Name"
              className={styles.input}
              value={toUpdateName}
              onChange={onChangeEditNameInput}
            />
            <input
              name="isbn_no"
              placeholder="isbno_no"
              className={styles.input}
              value={toUpdateISBNNo}
              onChange={onChangeEditISBNNoInput}
            />
            <button type="submit" className={styles.submit}>
              Update
            </button>
          </form>
        </Modal>
      )}
      <div className={styles.listContainer}>
        <div className={styles.listHead}>
          <button className={styles.listHeadItem}>
            <span className={styles.listHeadItemButton}>Name</span>
          </button>
          <button className={styles.listHeadItem}>
            <span className={styles.listHeadItemButton}>ISBN No</span>
          </button>
          <span className={`${styles.listHeadItem} ${styles.rowActionsHead}`}>
            <span className={styles.listHeadItemButton}>Actions</span>
          </span>
        </div>
        <div className={styles.list}>
          {isAvailable &&
            filtered.map((book) => (
              <div key={book.id} className={styles.row}>
                <span className={styles.rowColumn}>
                  <button
                    className={styles.rowActionsButton}
                    onClick={() =>
                      onViewDetails(true, {
                        author_id: book.author.id,
                        id: book.id,
                        name: book.name,
                        isbn_no: book.isbn_no,
                      })
                    }
                  >
                    {book.name}
                  </button>
                </span>
                <span className={styles.rowColumn}>{book.isbn_no}</span>
                <div className={styles.rowActions}>
                  <button
                    className={styles.rowActionsButton}
                    onClick={() =>
                      handleClickEditButton({
                        id: book.id,
                        isbn_no: book.isbn_no,
                        author: {
                          id: book.author.id,
                        },
                        name: book.name,
                      })
                    }
                  >
                    <FaPen />
                  </button>
                  <button
                    className={styles.rowActionsButton}
                    onClick={() => handleDeleteItem(book.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default BooksList;
