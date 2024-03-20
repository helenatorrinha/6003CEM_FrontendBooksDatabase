import React from 'react';
import { Menu } from 'antd';
import { Link, useHistory } from "react-router-dom";
import UserContext from '../contexts/user';

function Nav(props) {
  const { user, logout } = React.useContext(UserContext);
  const history = useHistory(); // Use useHistory hook for navigation

  const handleLogout = () => {
    logout(); // Call the logout function from context
    history.push('/'); // Redirect the user to the home page after logout
  };
  const currentUser = user.user_id;

  return (
    <>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/books">Books</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/books/add">Add Book</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/authors">Authors</Link></Menu.Item>
        <Menu.Item key="5"><Link to="/authors/add">Add Author</Link></Menu.Item>
        <Menu.Item key="6"><Link to="/genres">Genres</Link></Menu.Item>
        <Menu.Item key="7"><Link to="/genres/add">Add Genre</Link></Menu.Item>
        <Menu.Item key="8"><Link to={`/users/${currentUser}`}>Account</Link></Menu.Item>
        <Menu.Item key="9"><Link to="/users">Users</Link></Menu.Item>
        <Menu.Item key="10"><Link to="/login">Login</Link></Menu.Item>
        <Menu.Item key="11"><Link to="/register">Register</Link></Menu.Item>
        {/* Add onClick handler for logout */}
        <Menu.Item key="12" onClick={handleLogout}>Logout</Menu.Item>
      </Menu>
    </>
  );
}

export default Nav;
