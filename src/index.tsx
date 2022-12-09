import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import {App} from './app/App'
import {Provider} from 'react-redux'
import {store} from './app/store'
import {BrowserRouter} from 'react-router-dom'


const rerenderEntireTree = () => {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
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


////  "max-len": [
////    "error",
////    200,
////    2
////  ],
// "tabWidth": 4
//"tabWidth": 4,
//"useTabs": false
//  "arrowParens": "always"
