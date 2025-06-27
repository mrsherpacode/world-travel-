import PageNav from "../components/PageNav";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <PageNav />
      <h2> World-travel</h2>
      <Link to="/app">Go to App</Link>
    </div>
  );
}

export default HomePage;
