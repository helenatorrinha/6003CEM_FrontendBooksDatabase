import React from 'react';
import { Layout, Result } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import UserContext from './contexts/user';

import Nav from './components/nav';
import Account from './components/account';
import Users from './components/users';
import Home from './components/home';
import Books from './components/books';
import Book from './components/book'; 
import AddBook from './components/addbook';
import EditBook from './components/editbook';
import Authors from './components/authors';
import Author from './components/author';
import Genres from './components/genres';
import Genre from './components/genre'; 
import Login from './components/login';
import Register from './components/register';

const { Header, Content, Footer } = Layout;

// function App() {
//   return (
//     <Router>
//       <Header>
//         <Nav />
//       </Header>

//       <Content>
//         <Switch>
//         <Route path="/" exact children={<Home />} />
//           <Route path="/login" children={<Login />} />
//           <Route path="/register" children={<Register />} />
//           <Route path="/books/add" children={<AddBook />} />
//           <Route path="/books/edit/:id" children={<EditBook />} />
//           <Route path="/books/:id" children={<Book />} />
//           <Route path="/books" children={<Books />} />
//           <Route path="/authors/:id" children={<Author />} />
//           <Route path="/authors" children={<Authors />} />
//           <Route path="/genres/:id" children={<Genre />} />
//           <Route path="/genres" children={<Genres />} />
//           <Route path="/users/:id" children={<Account />} />
//           <Route path="/users" children={<Users />} />
//         </Switch>
//       </Content>

//       <Footer style={{ textAlign: 'center' }}>Created for Web API Development</Footer>

//     </Router>
//   );
// }

// export default App;


function NotFound() {
	return (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page not exist."
		/>
	);
}

class App extends React.Component {
	constructor(props) {
		super(props);
		alert("here")
		this.state = {
			user: { loggedIn: false },
			token: sessionStorage.getItem('token') || null
		}
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	login(user) {
		console.log("User is now being set on the context");
		user.loggedIn = true;
		this.setState({ user: user });
	}

	logout() {
		console.log("Removing user from the app context");
		// Remove the token from the session storage
		sessionStorage.removeItem('token');
		this.setState({ user: { loggedIn: false } });
	}

	render() {
		const context = {
			user: this.state.user,
			login: this.login,
			logout: this.logout
		  };
		  
		return (
			<UserContext.Provider value={context}>
				<Router>
					<Layout className='layout'>
						<Header className='header'>
							<Nav />
						</Header>

						<Content style={{ padding: '0 50px' }}>
              <Switch>
                <Route path="/" exact children={<Home />} />
                <Route path="/login" children={<Login />} />
                <Route path="/register" children={<Register />} />
                <Route path="/books/add" children={<AddBook />} />
                <Route path="/books/edit/:id" children={<EditBook />} />
                <Route path="/books/:id" children={<Book />} />
                <Route path="/books" children={<Books />} />
                <Route path="/authors/:id" children={<Author />} />
                <Route path="/authors" children={<Authors />} />
                <Route path="/genres/:id" children={<Genre />} />
                <Route path="/genres" children={<Genres />} />
                <Route path="/users/:id" children={<Account />} />
                <Route path="/users" children={<Users />} />
                <Route path="*" element={<NotFound />} />
              </Switch>
						</Content>

						<Footer className='Footer'> Created for Web API Development </Footer>
					</Layout>
				</Router>
			</UserContext.Provider>
		);
	}
}

export default App;
