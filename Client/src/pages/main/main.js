import React,{useState,useEffect} from "react"
import { useDispatch,useSelector } from 'react-redux';
import {Route,useHistory,Switch} from 'react-router-dom'
import Signin from '../signin'
import Home from '../home'
import {loadLoggedinUser} from '../../state/actions/userActions'
import User from "../user";

const Main = (props)=>{ 

    const {UserReducer:{status,usersession}}=useSelector(state=>state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{
        dispatch(loadLoggedinUser())  
    },[])    
    
    useEffect(()=>{
      if(status==1){
        history.push('/writers')
      }else{
        history.push('/login')
      }        
    },[])
   
  return (
    
    <Switch>
      <Route path="/login" component={Signin}/>
      <Route path="/" component={Home}/>     
      <Route path="/writers" component={User}/>
    </Switch>
 
  );
  }

export default Main