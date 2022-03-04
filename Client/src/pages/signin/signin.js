import React,{useState,useEffect} from "react"
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {loginUser} from '../../state/actions/userActions'

const Signin = (props) =>{

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [width,setWidh] = useState(window.innerWidth);

    const {UserReducer:{status,session}}=useSelector(state=>state)
    const dispatch = useDispatch()

    const history = useHistory()


   const handleResize = () =>{
      setWidh(window.innerWidth);      
   };

   useEffect(()=>{
      
    },[status])
   
    useEffect(()=>{
      window.addEventListener('resize',handleResize);

      return ()=>{
         window.removeEventListener('resize',handleResize);
      }
    },[])

    function LogUser(){
      dispatch(loginUser(username,password))        

      history.push('/')
    }

 

    return <div>
    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
    <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} />
    <button onClick={LogUser}>Login</button>
    <div>
{width}
    </div>
 </div>
}

export default Signin