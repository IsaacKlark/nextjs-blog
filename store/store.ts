import { applyMiddleware, createStore, combineReducers } from "redux";
import getId, { setId } from "./id";
import thunk from 'redux-thunk';

const reducer = combineReducers({
    id: getId
});

export const applyId = id => dispatch => {
    dispatch(setId(id));
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;