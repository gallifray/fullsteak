import React, { Component } from 'react';
import { Segment, Header, Form, Button, Grid, Icon, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Register extends Component {
    state = {}
    render() {
        return (
            <div className="Page">
                <Grid centered>
                    <Grid.Column computer={7} tablet={11} mobile={16}>
                        <Segment color='orange' padded stacked>
                            <Header textAlign='center' size='large'>Register</Header>
                            <Form>
                                <Form.Input type='email' required placeholder='Email address' icon='user' iconPosition='left' />
                                <Form.Input type='password' required placeholder='Password' icon='key' iconPosition='left' />
                                <Form.Input type='password' required placeholder='Password' icon='key' iconPosition='left' />
                                <Button fluid color='orange' type='submit'>Submit</Button>
                            </Form>
                        </Segment>
                        <Segment textAlign='center'>
                            <Link to='/login'>
                                <Button color='orange'>Already have an account ?</Button>
                            </Link>
                        </Segment>

                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Register;