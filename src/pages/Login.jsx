import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { useAuth } from "../components/contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // programmatic navigation.
  const navigate = useNavigate();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  // here the login  and isAuthenticated are from FakeAuthContext file and useAuth is re-useable context from same file
  const { login, isAuthenticated } = useAuth();
  // handle form function
  function handleForm(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }
  // to see if the user is isAutheticated
  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleForm}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">login</Button>
        </div>
      </form>
    </main>
  );
}
