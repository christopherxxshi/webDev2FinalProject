import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";


import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from "./reducers";
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers,composeEnhancers(applyMiddleware(reduxThunk)));
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(reduxThunk)));
// import { store, persistor } from "./store";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
            {/* <Provider store={persistStore(store)}> */}
            <App />
        </PersistGate>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
