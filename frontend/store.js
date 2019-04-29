import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import rootReducer from "./reducers";
import reduxThunk from "redux-thunk";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = typeof window != 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));


const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const storeVar = createStore(persistedReducer, composeEnhancers(applyMiddleware(reduxThunk)));


// export default store;

export const store = () => {
    return storeVar;
};

export const persistor = ()=>{
    return persistStore(storeVar);
}

// () => {
//     let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(reduxThunk))); //createStore(persistedReducer)
//     let persistor = persistStore(store);
//     return { store, persistor };
// }