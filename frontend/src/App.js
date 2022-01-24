import React from 'react';
import './App.css';
import UserList from './components/Users.js'
import ProjectList from './components/Projects';
import ToDoList from './components/ToDos';
import axios from 'axios'
import {HashRouter, Link, Route, Routes} from "react-router-dom"


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todos': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users')
      .then(response => {
        const users = response.data
          this.setState(
          {
            'users': users.results
          }
        )
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/projects')
    .then(response => {
      const projects = response.data
        this.setState(
        {
          'projects': projects.results
        }
      )
    }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/todos')
    .then(response => {
      const todos = response.data
        this.setState(
        {
          'todos': todos.results
        }
      )
    }).catch(error => console.log(error))
  }

  render() {
    return (
      <div class='app'>
        <HashRouter>
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
            </ul>
          </nav>
          <Routes>
            <Route path='/' element={<UserList users={this.state.users} />}/>
            <Route path='/projects' element={<ProjectList projects={this.state.projects} />}/>
            <Route path='/todos' element={<ToDoList todos={this.state.todos} />}/>
          </Routes>
        </HashRouter>
      </div>
    )
  }
}

export default App;