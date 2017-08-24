import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import reducer from '../reducer/reducer';

// const loggerMiddleware = createLogger();
// const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore() {
    return createStoreWithMiddleware(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
