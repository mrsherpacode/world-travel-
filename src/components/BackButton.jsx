import { useNavigate } from "react-router-dom";
import Button from "./Button";
// Here, i'm creating a re-useable BackButton component
function BackButton() {
  // Programmatic navigation allows us to go to other pages without us having to click on navigation link.

  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        // Here, -1 means go back to previous page.
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
