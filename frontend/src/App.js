import React from 'react';
import './App.css';
import UserList from './components/Users.js'
import ProjectList from './components/Projects';
import ToDoList from './components/ToDos';
import LoginForm from './components/Auth';
import ToDoForm from './components/TodoForm';
import ProjectForm from './components/ProjectForm';
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
      'token': '',
      'uuid': ''
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
    this.setState({'uuid': ''})
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
      this.setState({'uuid': this.state.users.filter((item) => item.username === username)[0].uuid})
    }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
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

  createToDo(textVal, project){
    const headers = this.get_headers()
    const data = {text: textVal, project: project, creator: this.state.uuid}
    axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers})
    .then(response => {
      let new_todo = response.data
      this.setState({todos: [...this.state.todos, new_todo]})
    }).catch(error => console.log(error))
  }

  createProject(name){
    const headers = this.get_headers()
    const data = {name: name, users: [this.state.uuid,]}
    axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
    .then(response => {
      let new_project = response.data
      this.setState({projects: [...this.state.projects, new_project]})
    }).catch(error => console.log(error))
  }

  deleteToDo(id){
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
    .then(response => {
      this.setState({todos: this.state.todos.filter((item) => item.id !== id)})
    }).catch(error => console.log(error))
  }

  deleteProject(id){
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
    .then(response => {
      this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
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
            <Route path='/projects' element={<ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />}/>
            <Route path='/todos' element={<ToDoList todos={this.state.todos} deleteToDo={(id) => this.deleteToDo(id)} />}/>
            <Route path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
            <Route path='/todos/create' element={<ToDoForm projects={this.state.projects} createToDo={(textVal, project) => this.createToDo(textVal, project)}/>}/>
            <Route path='/projects/create' element={<ProjectForm createProject={(name) => this.createProject(name)} />}/>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
