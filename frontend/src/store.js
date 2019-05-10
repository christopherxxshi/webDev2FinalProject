import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";


import { persistStore,persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from "./reducers";
// import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers,composeEnhancers(applyMiddleware(reduxThunk)));
var storeData = createStore(persistedReducer, composeEnhancers(applyMiddleware(reduxThunk)));


export const store = () => {
    return storeData;
};

export const persistor = () => {
    return persistStore(storeData);
}

