import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  // logo is always link to Homepage
  return (
    <Link to="/">
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />;
    </Link>
  );
}

export default Logo;
