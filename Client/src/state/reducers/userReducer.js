import {actionTypes} from '../actions/userActions'

const initState = {
    status : 0,
    posting: { busy: true, message: '', errors: null },
    data:[],
    usersession:{},
    modal: {},    
}

const UserReducer = (state=initState,action)=>{   
    
    switch(action.type){
        case actionTypes.SET_USER:                            
            return {...state,status:1,usersession:action.payload} 

        case actionTypes.LOGOUT_USER:                            
            return {...state,status:0,usersession:''}  

        case actionTypes.LOGIN_FAIL:
                return {...state,status:0}

        case actionTypes.POSTING:
            return {
                ...state,
                posting: {
                  busy: true                  
                },
              };   
                
        case actionTypes.POST_OK:
            return {
                ...state,
                posting: {
                  busy: false,
                  message: action.payload,
                  errors: null,
                },
              };   
              
        case actionTypes.POST_ERROR:
                return {
                    ...state,
                    posting: {
                      busy: false,                      
                      errors: action.payload,
                    },
                  };   

        case actionTypes.LOAD:           
            return {...state,data:action.payload}

        case actionTypes.LOAD_ERROR:           
            return {...state,data:[]}

        case actionTypes.LOADING:
            return {...state}

        case actionTypes.OPEN_MODAL:
            return {...state,modal:action.payload}
        default:
            return state
    }  
}




export default UserReducer;