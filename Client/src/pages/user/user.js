import React,{useState,useEffect, useCallback} from "react"
import { useDispatch,useSelector } from 'react-redux';
import TableView from "../../utils/table-view/table-view"
import { searchUser,openModalPopup } from '../../state/actions/userActions'
import UpdateUser from '../../modules/update-user'
import { v4 as uuidv4 } from "uuid";

const User = (props)=>{     
    const dispatch = useDispatch() 
    const {UserReducer:{data}}=useSelector(state=>state)   
    
    const [selectedUser,setselectedUser] = useState('');

    useEffect(()=>{      
        dispatch(searchUser({'Keyword':'','isBanded':false}));            
    },[])

  

    const openEdit =(row)=>{     
      const tId = uuidv4();
      dispatch(openModalPopup(tId,'USER',row));    
  }

    const drowUpdateUser=useCallback(()=>{      
        return <UpdateUser selectedUser={selectedUser}/>          
    },[JSON.stringify(selectedUser)])


  return (
    <>
      <TableView 
        headCells={headCells}
        allRows={data}
        headerTitle={'writers'}
        funcEdit={openEdit}
        id={'userId'}
      />
      {drowUpdateUser()}
      </>
  );
}

const headCells = [
    {
      id: 'userId',
      numeric: true,
      disablePadding: true,
      label: 'User Id',
    },
    {
      id: 'firstName',
      numeric: false,
      disablePadding: false,
      label: 'First Name',
    },
    {
      id: 'lastName',
      numeric: false,
      disablePadding: false,
      label: 'Last Name',
    },
    {
        id: 'emailAddress',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },      
    
  ];
  

export default User