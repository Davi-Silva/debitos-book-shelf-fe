import BooksList from '../components/Lists/BooksList';
import AuthorsList from '../components/Lists/AuthorsList';

import styles from './index.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <BooksList />
      <AuthorsList />
    </div>
  );
}
