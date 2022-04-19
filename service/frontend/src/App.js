import React from 'react';
import {BrowserRouter, Switch, Route, Link, Router} from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';


import UserList from './components/User.js';
import Menu from './components/Menu.js';
import Footer from './components/Footer.js';
import ProjectList from './components/Project.js'
import TodoList from './components/Todos.js'
import ProjectDetailList from './components/ProjectDetail.js';
import LoginForm from './components/Auth.js';
import ProjectForm from './components/ProjectForm.js';
import TodoForm from './components/TodoForm.js';
import NF404 from './components/NF404.js';


const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      projects: [],
      todos: [],
      'token': '',
      'username': '',
    }
  }

  getHeaders() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.isAuth()) {
        headers['Authorization'] = 'Token ' + this.state.token
    }
      return headers
  }

  loadData() {
    const headers = this.getHeaders()
    axios.get(get_url('users/'), {headers})
      .then(response => {
        this.setState( { users: response.data })
      }).catch(error => {
        console.log(error)
        this.setState({users: [] })
      })

    axios.get(get_url('project/'))
      .then(response => {
        this.setState({ projects: response.data.results })
      }).catch(error => {
        console.log(error)
        this.setState({ projects: [] })
      })

    axios.get(get_url('todos/'), {headers})
      .then(response => {
        this.setState({ todos: response.data.results })
      }).catch(error => {
        console.log(error)
        this.setState({todos: []})
      })
  }

  setToken(token, username) {
    const cookies = new Cookies()
    cookies.set('token', token)
    cookies.set('username', username)
    this.setState({ 'username': username })
    this.setState({'token': token}, () => this.loadData())
  }

  isAuth() {
    return this.state.token != ''
  }

  logout() {
    this.setToken('', '')
  }


  getTokenFromCookies() {
    const cookies = new Cookies()
    const token = cookies.get('token')

    this.setState({'token': token}, ()=>this.loadData())
  }

  getToken(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
      .then(response => {
        console.log(response.data)
        this.setToken(response.data['token'], username)
        return username
      }).catch(error => alert('Неверный логин или пароль'))
  }

   componentDidMount() {
     this.getTokenFromCookies()
   }

    render() {
        return (

            <div className="container-fluid">
                <BrowserRouter>

            <header>
              <Menu
                isAuth={() => this.isAuth()}
                logout={() => this.logout()}
                username={this.state.username} />
            </header>
            <section id="main">
              <Switch>
                <Route exact path='/' component={() => <ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} />
                <Route exact path='/users' component={() => <UserList users={this.state.users} />} />
                <Route exact path='/todos' component={() => <TodoList todos={this.state.todos} deleteTodo={(id)=>this.deleteTodo(id)} />} />
                <Route path="/project/:projectName">
                  <ProjectDetailList projects={this.state.projects} />
                </Route>

                <Route exact path='/login' component={
                  () => <LoginForm
                    get_token={(username, password) => this.getToken(username, password)}
                    isAuth={() => this.isAuth()}
                  />} />

                <Route exact path='/projects/create' component={
                  () => <ProjectForm
                    users={this.state.users}
                    createProject={(name, url, users) => this.createProject(name, url, users)} />} />


                <Route exact path='/todos/create' component={
                  () => <TodoForm
                    projects={this.state.projects}
                    users={this.state.users}
                    createTodo={(project, text, user) => this.createTodo(project, text, user)} />} />

                <Route component={NF404}/>
              </Switch>
                    </section>

                    <footer>
                        <Footer />
                    </footer>

                </BrowserRouter>
            </div>

        )
    }
}

export default App;
