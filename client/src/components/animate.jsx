import React, { Component } from 'react';
import { Transition } from 'semantic-ui-react'

export default (Page, animationType = 'fade up', duration = 200) => {
    return class Pagify extends Component {
        state = {}

        render() {
            return (
                <Transition transitionOnMount animation={animationType} duration={duration} unmountOnHide>
                    <div>
                        <Page />
                    </div>
                </Transition>
            );
        }
    }
}
