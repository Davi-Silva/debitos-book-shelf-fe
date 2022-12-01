import AuthorsSection from '../components/Sections/Authors';
import BooksSection from '../components/Sections/Books';

import styles from './index.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <AuthorsSection />
      <BooksSection />
    </div>
  );
}
