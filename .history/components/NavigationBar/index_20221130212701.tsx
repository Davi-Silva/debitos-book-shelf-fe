import styles from './styles.module.css';

const NavigationBar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.mainContainer}>
        <h1 className={styles.brand}></h1>
      </div>
    </nav>
  );
};

export default NavigationBar;
