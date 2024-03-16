import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import Nav from './components/nav';
import Account from './components/account';
import Users from './components/users';
import Home from './components/home';
import Books from './components/books';
import Book from './components/book'; 
import AddBook from './components/addbook';
import Authors from './components/authors';
import Author from './components/author';
import Genres from './components/genres';
import Genre from './components/genre'; 
import Login from './components/login';
import Register from './components/register';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Header>
        <Nav />
      </Header>

      <Content>
        <Switch>
          <Route path="/" children={<Home />} exact />
          <Route path="/books/add" children={<AddBook />} />
          <Route path="/books/:id" children={<Book />} />
          <Route path="/books" children={<Books />} />
          <Route path="/authors/:id" children={<Author />} />
          <Route path="/authors" children={<Authors />} />
          <Route path="/genres/:id" children={<Genre />} />
          <Route path="/genres" children={<Genres />} />
          <Route path="/users/:id" children={<Account />} />
          <Route path="/users" children={<Users />} />
          <Route path="/login" children={<Login />} />
          <Route path="/register" children={<Register />} />
        </Switch>
      </Content>

      <Footer style={{ textAlign: 'center' }}>Created for Web API Development</Footer>

    </Router>
  );
}

export default App;
