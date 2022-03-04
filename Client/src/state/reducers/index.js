import {combineReducers} from "redux";
import UserReducer from "./userReducer";

const reducers = combineReducers({  
    UserReducer:UserReducer
});

export default reducers;