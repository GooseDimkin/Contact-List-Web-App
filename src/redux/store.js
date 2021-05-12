import {createStore, combineReducers} from 'redux';
import loginReducer from './reducers/loginReducer';

let reducers = combineReducers({
    loginData: loginReducer
});

let store = createStore(reducers);

export default store;