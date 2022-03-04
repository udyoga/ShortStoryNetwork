import axios from 'axios'
import jwt from 'jwt-decode'
import {validateRegistration} from '../../utils/validtions/registration'

export const actionTypes = {
    SET_USER: 'SET_USER',
    LOGOUT_USER: 'LOGOUT_USER',
    LOGIN_FAIL: 'LOGIN_FAIL',
    SEARCH_RESPONSE: 'SEARCH_RESPONSE',
    POSTING: "POSTING",
    POST_OK: "POSTOK",
    LOADING: "POSTING",
    LOAD: "LOAD",
    LOAD_ERROR: "LOAD_ERROR",
    POST_ERROR: "POST_ERROR",
    OPEN_MODAL: "OPEN_MODAL",
};

export const loginUser = (item) => (dispatch) => {
    axios.post("User/Authenticate", item)
        .then((res) => {
            if (res.data.success) {
                cacheLoggedInUser(null, res.data.token);
                dispatch({
                    type: actionTypes.SET_USER,
                    payload: readJwtToken(res.data.token)
                });
            } else {
                dispatch({
                    type: actionTypes.LOGIN_FAIL,
                    payload: null
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

export const saveUser = (item) => (dispatch) => {

    dispatch({
        type: actionTypes.POSTING,
        payload: item,
    });

    if (item) {
        let errors = validateRegistration(item);
        if (errors) {
          dispatch({
            type: actionTypes.POST_ERROR,
            payload: errors
          });
          return;
        }
    }
   
    axios.post("User/save", item)
        .then((res) => {
            if (res) {
                dispatch({
                    type: actionTypes.POST_OK,
                    payload: res,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.POST_ERROR,
                payload: error,
            });
        });
}

export const updateUser = (item) => (dispatch) => {
    dispatch({
        type: actionTypes.POSTING,
        payload: item,
    });
    axios.post("User/UpdateUser", item)
        .then((res) => {
            if (res) {
                dispatch({
                    type: actionTypes.POST_OK,
                    payload: res,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.POST_ERROR,
                payload: error,
            });
        });
}

export const savePost = (item) => (dispatch) => {
    dispatch({
        type: actionTypes.POSTING,
        payload: item,
    });
    axios.post("Post/save", item)
        .then((res) => {
            if (res) {
                dispatch(searchPosts(''))                
                dispatch({
                    type: actionTypes.POST_OK,
                    payload: res,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.POST_ERROR,
                payload: error,
            });
        });
}

export const searchUser = (item) => (dispatch) => {
    dispatch({
        type: actionTypes.LOADING,
        payload: item,
    });
    axios.post("User/Search", item)
        .then((res) => {
            if (res) {
                dispatch({
                    type: actionTypes.LOAD,
                    payload: res.data,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.LOAD_ERROR,
                payload: error,
            });
        });
}

export const searchStateVowel = () => (dispatch) => {
    dispatch({
        type: actionTypes.LOADING
    });
    axios.post("StatVowels/Search")
        .then((res) => {
            if (res) {
                dispatch({
                    type: actionTypes.LOAD,
                    payload: res.data,
                });
            }
        })
        .catch((error) => {           
            dispatch({
                type: actionTypes.LOAD_ERROR,
                payload: error,
            });
        });
}

export const searchPosts = (keyword) => (dispatch) => {
    dispatch({
        type: actionTypes.LOADING
    });
    axios.post("Post/Search?keyword=" + keyword)
        .then((res) => {
            if (res) {
                dispatch({
                    type: actionTypes.LOAD,
                    payload: res.data,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.POST_ERROR,
                payload: error,
            });
        });
}

export const openModalPopup = (changeKey,page, object) => (dispatch) => {
    dispatch({
        type: actionTypes.OPEN_MODAL,
        payload: {'changeKey':changeKey,'page': page,'object':object},
    });
}

export const loadLoggedinUser = () => (dispatch) => {
    const token = localStorage._USER_TOKEN;
    const userToken = readJwtToken(token);
    const currentEpchTime = Date.now() / 1000;

    if (userToken) {
        dispatch({
            type: actionTypes.SET_USER,
            payload: userToken
        });

        if (currentEpchTime < userToken.exp) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }
};

export const logout = () => (dispatch) => {
    forgetLoggedInUser()
    dispatch({
        type: actionTypes.LOGOUT_USER
    });
};

const readJwtToken = (token) => {
    try {
        const userToken = jwt(token);

        console.log('SESSION_USER',userToken)

        return userToken;

    } catch (error) {
        return null;
    }
}

const cacheLoggedInUser = (user, token) => {
    localStorage.setItem("_USER_TOKEN", token);
    //localStorage.setItem("UserLoggedIn", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const forgetLoggedInUser = () => {
    localStorage.removeItem("_USER_TOKEN");
    delete axios.defaults.headers.common["Authorization"];
};