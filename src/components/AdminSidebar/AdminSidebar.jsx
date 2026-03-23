import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import "./AdminSidebar.css";

const linkClass = ({ isActive }) => `link ${isActive ? "active" : ""}`;

export default function AdminSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <aside
        className={`admin-sidebar ${isSidebarOpen ? "show" : "hide"}`}
        aria-label="Admin navigation"
      >
        <h2>Admin menu:</h2>
        <button
          className="btn-close btn btn-text btn-effect-rotate"
          onClick={toggleSidebar}
          type="button"
          aria-label="Hide admin sidebar"
          title="Hide admin sidebar"
        >
          X
        </button>

        <nav>
          <NavLink to={ROUTES.ADMIN} className={linkClass} end>
            Start page
          </NavLink>
          <section>
            <h3>Books</h3>
            <ul>
              <li>
                <NavLink to={ROUTES.ADMIN_BOOKS} className={linkClass} end>
                  Manage books
                </NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink to={ROUTES.ADMIN_BOOK_CREATE} className={linkClass}>
                  Add new book
                </NavLink>
              </li>
            </ul>
          </section>

          <section>
            <h3>Users</h3>
            <ul>
              <li>
                <NavLink to={ROUTES.ADMIN_USERS} className={linkClass}>
                  Manage users
                </NavLink>
              </li>
            </ul>
          </section>

          <section>
            <h3>Orders</h3>
            <ul>
              <li>
                <NavLink to={ROUTES.ADMIN_ORDERS} className={linkClass}>
                  View orders
                </NavLink>
              </li>
            </ul>
          </section>

          <section>
            <h3>Categories</h3>
            <ul>
              <li>
                <NavLink to={ROUTES.ADMIN_CATEGORIES} className={linkClass}>
                  Manage categories
                </NavLink>
              </li>
            </ul>
          </section>

          <section>
            <h3>Settings</h3>
            <ul>
              <li>
                <NavLink to={ROUTES.ADMIN_SETTINGS} className={linkClass}>
                  General settings
                </NavLink>
              </li>
            </ul>
          </section>
        </nav>
      </aside>

      {isSidebarOpen || (
        <button
          className="btn-open btn btn-effect-shadow"
          onClick={toggleSidebar}
          type="button"
          aria-label="Show admin sidebar"
          title="Show admin sidebar"
        >
          &gt;
        </button>
      )}
    </>
  );
}
