import React, { Component } from 'react';
import { Segment, Header, Form, Button, Grid, Icon, Divider, Transition, Dimmer, Loader } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../redux/actions/auth'

class Login extends Component {
    state = {
        email: 'antoine@gallifray.io',
        password: 'Pepito.123',
        loading: false,
        success: true,
        redirect: false
    }

    handleChange = (e) => {
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.email || !this.state.password)
            return
        this.setState({ loading: true })
        this.props.login(this.state.email, this.state.password)
    }

    redirect = () => {
        setTimeout(() => {
            this.setState({ redirect: true })
        }, 100)
    }

    render() {
        if (this.state.redirect)
            return <Redirect to='/' />
        return (
            <Transition visible={!this.props.user} onComplete={this.redirect} animation='scale' duration={200}>
                <div className="Page">
                    <Grid centered>
                        <Grid.Column computer={7} tablet={11} mobile={16}>
                            <Segment color='orange' padded stacked>
                                <Dimmer inverted active={this.state.loading}>
                                    <Loader>Please wait...</Loader>
                                </Dimmer>
                                <Header textAlign='center' size='large'>Log in</Header>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Input onChange={this.handleChange} value={this.state.email} name='email' type='email' required placeholder='Email address' icon='user' iconPosition='left' />
                                    <Form.Input onChange={this.handleChange} value={this.state.password} name='password' type='password' required placeholder='Password' icon='key' iconPosition='left' />
                                    <Button fluid color='orange' type='submit'>Submit</Button>
                                </Form>
                            </Segment>
                            <Segment textAlign='center'>
                                <Link to='/register'>
                                    <Button color='orange'>You don't have an account ?</Button>
                                </Link>
                                <Divider horizontal>or</Divider>
                                <Link to='/recover'>
                                    <Button color='orange' basic>Forgot your password ?</Button>

                                </Link>
                            </Segment>

                        </Grid.Column>
                    </Grid>
                </div>
            </Transition>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(login(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);