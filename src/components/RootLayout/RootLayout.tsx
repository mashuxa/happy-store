import { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "src/router/routes";
import styles from "./RootLayout.module.scss";

const RootLayout: FC = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <NavLink to={ROUTES.main} className={styles.logo}>
          Happy <span className={styles.primary}>Store</span>
        </NavLink>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
