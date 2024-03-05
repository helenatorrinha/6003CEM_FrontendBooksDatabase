
import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';

import Nav from './components/nav';
import Account from './components/account';
import Home from './components/home';
import Books from './components/books';
import Authors from './components/authors';
import Genres from './components/genres';
import Login from './components/login';
import Register from './components/register';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className='layout'>
        <Header className='header'>
          <Nav />
        </Header>

        <Content style={{ padding: '0 50px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Content>

        <Footer className='Footer'></Footer>
      </Layout>
    </Router>
  );
}

export default App;
