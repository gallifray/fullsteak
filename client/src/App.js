import React, { Component } from 'react';
import 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './css/style.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Layout from './pages/Layout'
import NotFound from './pages/NotFound'
import animate from './components/animate'
import { Provider } from 'react-redux'

import store from './redux/store'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Layout>
                        <Switch>
                            <Route exact path='/' component={animate(HomePage)} />
                            <Route exact path='/login' component={animate(LoginPage)} />
                            <Route exact path='/register' component={animate(RegisterPage)} />
                            <Route component={animate(NotFound)} />
                        </Switch>
                    </Layout>
                </Router>
            </Provider>
        );
    }
}

export default App;
