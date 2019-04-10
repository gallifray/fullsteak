import React from 'react';
import { Menu, Icon, Container, Transition } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const Layout = (props) => {
    return (
        <div>
            <Menu className='MainMenu' size='huge' attached borderless inverted>
                <Menu.Item header as={Link} to='/'>
                    <Icon color='orange' name='code' /> FULLSTEAK
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item as={Link} to='/login'>
                        <Icon color='orange' name='user outline' /> Login
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <Transition transition='scale' transitionOnMount duration={300} unmountOnHide>
                <Container>
                    {props.children}
                </Container>
            </Transition>
        </div>
    );
}

export default Layout;