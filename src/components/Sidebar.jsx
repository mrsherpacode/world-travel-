import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
//  sidebar component
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p> The list of Cities</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by World-Travel INC.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
