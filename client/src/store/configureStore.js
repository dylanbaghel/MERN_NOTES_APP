import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './../reducers/authReducer';
import noteReducer from './../reducers/noteReducer';
import errorReducer from './../reducers/errorReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = () => {
    const store = createStore(combineReducers({
        auth: authReducer,
        notes: noteReducer,
        errors: errorReducer
    }), composeEnhancers(
        applyMiddleware(thunk)
    ));

    return store;
};

export default configureStore;