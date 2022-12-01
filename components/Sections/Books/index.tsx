import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

import { BOOK_SHELF_API_ENDPOINT } from '../../../constants/envs';
import { useAppDispatch } from '../../../store';
import { filterBook, getBooks } from '../../../store/slices/books';

import BooksList from '../../Lists/BooksList';
import Modal from '../../Modal';

import styles from './styles.module.css';

const BooksSection = () => {
  const dispatch = useAppDispatch();

  const [isCreating, setIsCreating] = useState(false);
  const [toCreateName, setToCreateName] = useState('');
  const [toCreateAuthorId, setToCreateAuthorId] = useState<number>();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      name: toCreateName,
      author: {
        id: toCreateAuthorId,
      },
    };

    const dataPost = await axios.post(`${BOOK_SHELF_API_ENDPOINT}/books`, body);

    if (dataPost.data.statusCode === 200) {
      onClose();
      dispatch(getBooks());
    }
  };

  const onClose = () => {
    setIsCreating(false);
    setToCreateAuthorId(undefined);
    setToCreateName('');
  };

  const onChangeCreateNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setToCreateName(e.currentTarget.value);
  };

  const onChangeCreateAuthorIdInput = (e: ChangeEvent<HTMLInputElement>) => {
    setToCreateAuthorId(parseInt(e.currentTarget.value));
  };

  const openCreation = () => {
    setIsCreating(true);
  };

  const onFilterBooks = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterBook(e.currentTarget.value));
  };

  return (
    <>
      {isCreating && (
        <Modal title="Add new Book" onClose={onClose}>
          <form className={styles.form} onSubmit={onSubmit}>
            <input
              name="name"
              placeholder="Name"
              className={styles.input}
              value={toCreateName}
              onChange={onChangeCreateNameInput}
            />
            <input
              name="author"
              placeholder="Author ID"
              className={styles.input}
              value={toCreateAuthorId}
              type="number"
              onChange={onChangeCreateAuthorIdInput}
            />
            <button type="submit" className={styles.submit}>
              Create
            </button>
          </form>
        </Modal>
      )}
      <div className={styles.column}>
        <div className={styles.sectionHeader}>
          <button className={styles.add} onClick={openCreation}>
            <FaPlus />
          </button>
          <input
            className={`${styles.input} ${styles.search}`}
            placeholder="Search"
            onChange={onFilterBooks}
          />
        </div>
        <BooksList />
      </div>
    </>
  );
};

export default BooksSection;
