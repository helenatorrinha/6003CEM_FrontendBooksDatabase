import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";

function Nav(props) {
  return (
    <>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/books">Books</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/books/add">Add Book</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/authors">Authors</Link></Menu.Item>
        <Menu.Item key="5"><Link to="/authors/add">New Author</Link></Menu.Item>
        <Menu.Item key="6"><Link to="/genres">Genres</Link></Menu.Item>
        <Menu.Item key="7"><Link to="/genres/add">Add Genre</Link></Menu.Item>
        <Menu.Item key="8"><Link to="/users/1">Account</Link></Menu.Item> 
        <Menu.Item key="9"><Link to="/users">Users</Link></Menu.Item>  
        <Menu.Item key="10"><Link to="/login">Login</Link></Menu.Item>   
        <Menu.Item key="11"><Link to="/register">Register</Link></Menu.Item> 
        <Menu.Item key="12"><Link to="/logout">Logout</Link></Menu.Item>  
      </Menu>
    </>
  );
}

export default Nav;