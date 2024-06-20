import styles from './RootLayout.module.scss';

const RootLayout = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        Happy Store
      </header>
    </div>
  );
}

export default RootLayout;
