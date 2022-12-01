import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

import { BOOK_SHELF_API_ENDPOINT } from '../../../constants/envs';
import { useAppDispatch } from '../../../store';
import { filterAuthor, getAuthors } from '../../../store/slices/authors';

import AuthorsList from '../../Lists/AuthorsList';
import Modal from '../../Modal';

import styles from './styles.module.css';

const AuthorsSection = () => {
  const dispatch = useAppDispatch();

  const [isCreating, setIsCreating] = useState(false);
  const [toCreateName, setToCreateName] = useState('');
  const [toCreateCountry, setToCreateCountry] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      name: toCreateName,
      country: toCreateCountry,
    };

    const dataPost = await axios.post(
      `${BOOK_SHELF_API_ENDPOINT}/authors`,
      body
    );

    if (dataPost.data.statusCode === 200) {
      onClose();
      dispatch(getAuthors());
    }
  };

  const onClose = () => {
    setIsCreating(false);
    setToCreateCountry('');
    setToCreateName('');
  };

  const onChangeCreateNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setToCreateName(e.currentTarget.value);
  };

  const onChangeCreateCountryInput = (e: ChangeEvent<HTMLInputElement>) => {
    setToCreateCountry(e.currentTarget.value);
  };

  const openCreation = () => {
    setIsCreating(true);
  };

  const onFilterAuthors = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterAuthor(e.currentTarget.value));
  };

  return (
    <>
      {isCreating && (
        <Modal title="Add new Author" onClose={onClose}>
          <form className={styles.form} onSubmit={onSubmit}>
            <input
              name="name"
              placeholder="Name"
              className={styles.input}
              value={toCreateName}
              onChange={onChangeCreateNameInput}
            />
            <input
              name="country"
              placeholder="Country"
              className={styles.input}
              value={toCreateCountry}
              onChange={onChangeCreateCountryInput}
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
            onChange={onFilterAuthors}
          />
        </div>
        <AuthorsList />
      </div>
    </>
  );
};

export default AuthorsSection;
