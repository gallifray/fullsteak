import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import authReducer from './reducers/auth'
import thunk from 'redux-thunk';


const store = createStore(
    combineReducers({ auth: authReducer }),
    {
        auth: {
            user: null
        }
    },
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
// const store = createStoreWith(combineReducers({ authReducer }), thunk, [window.__REDUX_DEVTOOLS_EXTENSION__()]);


export default store;