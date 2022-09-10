import rocketLogo from '../assets/rocket-logo.svg';

import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={rocketLogo} alt="Logotipo do Fogete" />

      <span>to</span>
      <span>do</span>
    </header>
  );
}