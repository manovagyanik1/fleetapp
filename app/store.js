import { createStore, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const configureStore = () => {
    return createStore(
        applyMiddleware(
            thunkMiddleware,
            createLogger()
        )
    );
};

export default configureStore;
