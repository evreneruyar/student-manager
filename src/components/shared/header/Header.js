import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth/AuthContext";

const Header = ({ headerTitle }) => {
  const { userData, logout } = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <header className="header">
      <div className="logo">
        <h1>
          <Link to="/">
            <FontAwesomeIcon icon={faSchool} size="sm" className="icon" />
            {headerTitle}
          </Link>
        </h1>
      </div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {userData && (
            <li>
              <Link to="/students">Students</Link>
            </li>
          )}
          {userData && (
            <li>
              <Link to="/add-student">Add Student</Link>
            </li>
          )}
          {userData ? (
            <li>
              <a href="/" onClick={handleLogout}>
                Logout
              </a>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

Header.defaultProps = {
  headerTitle: "Lorem Ipsum",
};

Header.propTypes = { headerTitle: PropTypes.string.isRequired };

export default React.memo(Header);
