import React from 'react';
import axios from 'axios';
import UserList from './components/User.js';
import {ProjectList, ProjectDetail} from './components/Projects.js'
import TodoList from './components/Todos.js'
import Footer from './components/Footer.js';
import Navbar from './components/Menu.js';
import NF404 from './components/NF404.js';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import LoginForm from './components/Auth.js';
import Cookies from 'universal-cookie';


const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navbarItems: [
                {name: 'Users', href:'users'},
                {name: 'Projects', href:'/'},
                {name: 'TODOs', href:'todos'},
            ],
            users: [],
            projects: [],
            project: {},
            todos: [],
            token: '',
        }
    }

    getProject(id) {
        axios.get(get_url(`projects/${id}`))
            .then(response => {
                this.setState({project: response.data})
            }).catch(error => console.log(error))
    }

    setToken(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () =>this.loadData())
    }

    logout() {
        this.setToken('')
    }

    isAuth() {
        return !!this.state.token
    }

    getTokenFromCookies() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.loadData())
    }

    getToken(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            console.log(response.data['token'])
            this.setToken(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if(this.isAuth()) {
            headers['Authorization'] = `Token ${this.state.token}`
        }

        return headers
    }

    loadData() {

        const headers = this.getHeaders()

        axios.get(get_url('users/'), {headers})
        .then(response => {
            this.setState( {
                users: response.data
            })
        })
        .catch(error => {
            console.log(error)
            this.setState({'users': []})
        })

        axios.get(get_url('project/'))
        .then(response => {
            this.setState( {
                projects: response.data.results
            })
        })
        .catch(error => {
            console.log(error)
            this.setState({'projects': []})
        })

        axios.get(get_url('todos/'), {headers})
        .then(response => {
            this.setState( {
                todos: response.data.results
            })
        })
        .catch(error => {
            console.log(error)
            this.setState({'todos': []})
        })
    }

    componentDidMount() {
        this.getTokenFromCookies()
    }

    render() {
        return (

            <div className="container-fluid">
                <BrowserRouter>

                    <header>
                        <div className="container">
                            {this.isAuth() ?
                                <button onClick={()=>this.logout()} className="btn btn-outline-dark">Logout</button> :
                                <Link to='/login'  className="btn btn-outline-dark">Login</Link>}
                        </div>
                        <Navbar navbarItems={this.state.navbarItems} />
                    </header>

                    <section id="main">
                        <Switch>
                            <Route exact path='/'>
                                <ProjectList projects={this.state.projects}/>
                            </Route>
                            <Route exact path='/todos'>
                                <TodoList todos={this.state.todos}/>
                            </Route>
                            <Route exact path='/users'>
                                <UserList users={this.state.users}/>
                            </Route>
                            <Route exact path='/login'>
                                <LoginForm getToken={(username, password) => this.getToken(username, password)}/>
                            </Route>
                            <Route path="/project/:id" children={
                                <ProjectDetail getProject={(id) => this.getProject(id)}
                                item={this.state.project}
                                />}
                            />
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
