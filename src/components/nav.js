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
        <Menu.Item key="3"><Link to="/authors">Authors</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/genres">Genres</Link></Menu.Item>
        <Menu.Item key="5"><Link to="/account">Account</Link></Menu.Item>       
        <Menu.Item key="6"><Link to="/login">Login</Link></Menu.Item>   
        <Menu.Item key="7"><Link to="/register">Register</Link></Menu.Item> 
        <Menu.Item key="8"><Link to="/logout">Logout</Link></Menu.Item>  
      </Menu>
    </>
  );
}

export default Nav;