import React from "react";
import { Link } from "react-router-dom";
import styles from "./style/Navbar.module.css"; // Import CSS module

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Student Manager</div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/" className={styles.navItem}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/add" className={styles.navItem}>
            Add Student
          </Link>
        </li>
        <li>
          <Link to="/faculities" className={styles.navItem}>
          faculities
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
