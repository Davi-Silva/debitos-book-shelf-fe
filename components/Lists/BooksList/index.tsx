import React, { useEffect, useState } from 'react';
import { FaTrash, FaPen } from 'react-icons/fa';

import { BOOK_SHELF_API_ENDPOINT } from '../../../constants/envs';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getBooks, setBooks } from '../../../store/slices/books';

import styles from './styles.module.css';

const BooksList = () => {
  const dispatch = useAppDispatch();
  const { data, status, filtered } = useAppSelector(({ books }) => books);
  const isAvailable = data.length > 0 && status === 'succeeded';

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleDeleteItem = async (id: number) => {
    try {
      const responseDelete = await fetch(
        `${BOOK_SHELF_API_ENDPOINT}/books/${id}`,
        { method: 'DELETE' }
      );
      const dataDelete = await responseDelete.json();

      if (dataDelete.statusCode === 200) {
        const responseGet = await fetch(`${BOOK_SHELF_API_ENDPOINT}/books`);
        const dataGet = await responseGet.json();

        if (dataGet.statusCode === 200) {
          dispatch(setBooks(dataGet.results));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickEditButton = () => {};

  return (
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
          data.map((book) => (
            <div key={book.id} className={styles.row}>
              <span className={styles.rowColumn}>
                <button className={styles.rowActionsButton}>{book.name}</button>
              </span>
              <span className={styles.rowColumn}>{book.isbn_no}</span>
              <div className={styles.rowActions}>
                <button
                  className={styles.rowActionsButton}
                  onClick={() => handleClickEditButton()}
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
  );
};

export default BooksList;
