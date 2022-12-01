import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FaTrash, FaPen } from 'react-icons/fa';
import axios from 'axios';

import { BOOK_SHELF_API_ENDPOINT } from '../../../constants/envs';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getAuthors, setAuthor } from '../../../store/slices/authors';
import { getBooks } from '../../../store/slices/books';
import Modal from '../../Modal';

import styles from './styles.module.css';
import { SelectedToEditType, SelectedToViewType } from './types';

const AuthorsList = () => {
  const dispatch = useAppDispatch();
  const { data, status, filtered } = useAppSelector(({ authors }) => authors);
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
  const [toUpdateCountry, setToUpdateCountry] = useState('');

  useEffect(() => {
    dispatch(getAuthors());
  }, [dispatch]);

  const handleDeleteItem = async (id: number) => {
    try {
      const dataDelete = await axios.delete(
        `${BOOK_SHELF_API_ENDPOINT}/authors/${id}`
      );

      if (dataDelete.data.statusCode === 200) {
        const dataGet = await axios.get(`${BOOK_SHELF_API_ENDPOINT}/authors`);

        if (dataGet.data.statusCode === 200) {
          dispatch(setAuthor(dataGet.data.results));

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
    setToUpdateCountry(row.country);
    setToUpdateName(row.name);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      name: toUpdateName,
      country: toUpdateCountry,
    };

    const dataPut = await axios.put(
      `${BOOK_SHELF_API_ENDPOINT}/authors/${selectedToEdit.id}`,
      body
    );

    if (dataPut.data.statusCode === 200) {
      onClose();
      dispatch(getAuthors());
    }
  };

  const onClose = () => {
    setIsEditing(false);
    setSelectedToEdit(undefined);
    setToUpdateCountry('');
    setToUpdateName('');
  };

  const onChangeEditNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setToUpdateName(e.currentTarget.value);
  };

  const onChangeEditCountryInput = (e: ChangeEvent<HTMLInputElement>) => {
    setToUpdateCountry(e.currentTarget.value);
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
              htmlFor={`country-${selectedToView.id}`}
              className={styles.label}
            >
              Country
            </label>
            <p id={`country-${selectedToView.id}`} className={styles.formP}>
              {selectedToView.country}
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
              name="country"
              placeholder="Country"
              className={styles.input}
              value={toUpdateCountry}
              onChange={onChangeEditCountryInput}
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
            <span className={styles.listHeadItemButton}>Country</span>
          </button>
          <span className={`${styles.listHeadItem} ${styles.rowActionsHead}`}>
            <span className={styles.listHeadItemButton}>Actions</span>
          </span>
        </div>
        <div className={styles.list}>
          {isAvailable &&
            filtered.map((author) => (
              <div key={author.id} className={styles.row}>
                <span className={styles.rowColumn}>
                  <button
                    className={styles.rowActionsButton}
                    onClick={() =>
                      onViewDetails(true, {
                        country: author.country,
                        id: author.id,
                        name: author.name,
                      })
                    }
                  >
                    {author.name}
                  </button>
                </span>
                <span className={styles.rowColumn}>{author.country}</span>
                <div className={styles.rowActions}>
                  <button
                    className={styles.rowActionsButton}
                    onClick={() =>
                      handleClickEditButton({
                        id: author.id,
                        country: author.country,
                        name: author.name,
                      })
                    }
                  >
                    <FaPen />
                  </button>
                  <button
                    className={styles.rowActionsButton}
                    onClick={() => handleDeleteItem(author.id)}
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

export default AuthorsList;
