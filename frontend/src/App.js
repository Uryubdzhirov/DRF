import React from 'react';
	import './App.css';
	import UserList from './components/Users.js'
	import ProjectList from './components/Projects';
	import ToDoList from './components/ToDos';
	import LoginForm from './components/Auth';
	import axios from 'axios'
	import {BrowserRouter, Link, Route, Routes} from "react-router-dom"
	import Cookies from 'universal-cookie'


	class App extends React.Component {
	constructor(props) {
	super(props)
	this.state = {
	'users': [],
	'projects': [],
	'todos': [],
	'token': ''
	}
	}

	set_token(token) {
	const cookies = new Cookies()
	cookies.set('token', token)
	this.setState({'token': token}, ()=>this.load_data())
	}

	is_authenticated() {
	return this.state.token !== ''
	}

	logout() {
	this.set_token('')
	}

	get_token_from_storage() {
	const cookies = new Cookies()
	const token = cookies.get('token')
	this.setState({'token': token}, ()=>this.load_data())
	}

	get_token(username, password) {
	axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
	.then(response => {
	this.set_token(response.data['token'])
	}).catch(error => alert('Неверный логин или пароль'))
	}

	get_headers() {
	let headers = {
	'Content-Type': 'applications/json'
	}
	if (this.is_authenticated())
	{
	headers['Authorization'] = 'Token ' + this.state.token
	}
	return headers
	}

	load_data() {
	const headers = this.get_headers()
	axios.get('http://127.0.0.1:8000/api/users', {headers})
	.then(response => {
	const users = response.data
	this.setState(
	{
	'users': users.results
	}
	)
	}).catch(error => console.log(error))

	axios.get('http://127.0.0.1:8000/api/projects', {headers})
	.then(response => {
	const projects = response.data
	this.setState(
	{
	'projects': projects.results
	}
	)
	}).catch(error => console.log(error))

	axios.get('http://127.0.0.1:8000/api/todos', {headers})
	.then(response => {
	const todos = response.data
	this.setState(
	{
	'todos': todos.results
	}
	)
	}).catch(error => console.log(error))
	}

	componentDidMount() {
	this.get_token_from_storage()
	}

	render() {
	return (
	<div class='app'>
	<BrowserRouter>
	<nav>
	<ul>
	<li>
	<Link to='/'>Users</Link>
	</li>
	<li>
	<Link to='/projects'>Projects</Link>
	</li>
	<li>
	<Link to='/todos'>ToDos</Link>
	</li>
	<li>
	{this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
	</li>
	</ul>
	</nav>
	<Routes>
	<Route path='/' element={<UserList users={this.state.users} />}/>
	<Route path='/projects' element={<ProjectList projects={this.state.projects} />}/>
	<Route path='/todos' element={<ToDoList todos={this.state.todos} />}/>
	<Route path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
	</Routes>
	</BrowserRouter>
	</div>
	)
	}
	}

	export default App;