import { createStore, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import rootReducer from './rootReducer';
import thunkMiddleware from 'redux-thunk';

const configureStore = () => {
    return createStore(
        rootReducer,
        applyMiddleware(
            thunkMiddleware,
            createLogger()
        )
    );
};

export default configureStore;
