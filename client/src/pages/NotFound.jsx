import React from 'react';
import { Header, Icon, Button, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='VerticalAligned Page center'>
            <Header as='h2' icon>
                <Icon name='compass outline' size='massive' />
                404 &mdash; Not Found
                <Header.Subheader>You probably got to the wrong place</Header.Subheader>
            </Header>
            <br />
            <Button as={Link} to='/'>
                <Icon name='home' /> Go back to home page
            </Button>
        </div>
    );
}

export default NotFound;