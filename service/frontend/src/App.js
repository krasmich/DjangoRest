import React from 'react';
import axios from 'axios';
import UserList from './components/User.js';
import {ProjectList, ProjectDetail} from './components/Projects.js'
import TodoList from './components/Todos.js'
import Footer from './components/Footer.js';
import Navbar from './components/Menu.js';
import NF404 from './components/NF404.js';
import {BrowserRouter, Switch, Route} from "react-router-dom";


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
        }
    }

    getProject(id) {
        axios.get(get_url(`projects/${id}`))
            .then(response => {
                this.setState({project: response.data})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        axios.get(get_url('users/'))
        .then(response => {
            this.setState( {
                users: response.data
            })
        })
        .catch(error => console.log(error))

        axios.get(get_url('project/'))
        .then(response => {
            this.setState( {
                projects: response.data.results
            })
        })
        .catch(error => console.log(error))

        axios.get(get_url('todos/'))
        .then(response => {
            this.setState( {
                todos: response.data.results
            })
        })
        .catch(error => console.log(error))
    }

    render() {
        return (

            <div className="container-fluid">
                <BrowserRouter>

                    <header>
                        <Navbar navbarItems={this.state.navbarItems}/>
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
