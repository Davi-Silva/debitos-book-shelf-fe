import { FaBook } from 'react-icons/fa';

import styles from './styles.module.css';

const NavigationBar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.mainContainer}>
        <h1 className={styles.brand}>Debitos Book Shelf</h1>
        <FaBook size={1} />
      </div>
    </nav>
  );
};

export default NavigationBar;
