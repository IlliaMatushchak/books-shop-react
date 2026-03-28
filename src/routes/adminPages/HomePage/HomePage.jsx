import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page fancy-background">
      <h2>Admin home page</h2>
      <p>Welcome to the Admin home page</p>
      <p>
        Here you can use the <b>Admin Menu</b> to navigate through the available management pages.
        To show the Admin Menu click the <b>"&gt;"</b> button on the left side of the screen. To{" "}
        <b>hide</b> it again, click the <b>"X"</b> button.
      </p>
      <h3>Currently available pages:</h3>
      <nav>
        <ul>
          <li>
            <NavLink to={ROUTES.ADMIN_BOOKS}>Manage books</NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to={ROUTES.ADMIN_BOOK_CREATE}>Add new book</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
