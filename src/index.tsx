import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import {App} from './app/App'
import {Provider} from 'react-redux'
import {store} from './app/store'
import {BrowserRouter} from 'react-router-dom'
// import {PersistGate} from 'redux-persist/integration/react';


const rerenderEntireTree = () => {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                {/*<PersistGate loading={null} persistor={persistor}>*/}
                    <App/>
                {/*</PersistGate>*/}
            </BrowserRouter>
        </Provider>, document.getElementById('root')
    )

}


rerenderEntireTree()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

//Hot Module Replacement Hot reloading
if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./app/App', () => {
        rerenderEntireTree()
    })
}