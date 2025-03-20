import React from "react";
import { Link } from "react-router-dom";
import styles from "./style/Navbar.module.css"; // Import CSS module
import logo from "./assets/Logo.png"; // Đảm bảo logo nằm trong thư mục assets

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="University of Science Logo" className={styles.logo} />
        <span className={styles.logoText}>University of Science</span>
      </div>
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
            Faculties
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
