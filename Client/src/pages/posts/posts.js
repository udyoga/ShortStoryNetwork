import React,{useState,useEffect} from "react"
import { useDispatch,useSelector } from 'react-redux';
import TableView from "../../utils/table-view/table-view"
import { searchPosts,openModalPopup } from '../../state/actions/userActions'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AddPost from '../../modules/add-post'
import { v4 as uuidv4 } from "uuid";

const Post = (props)=>{     
    const dispatch = useDispatch()
    const {UserReducer:{data}}=useSelector(state=>state)    
    let rows = [];

    useEffect(()=>{
        dispatch(searchPosts(''));
    },[])  

    const openAddPost =() =>{
        const tId = uuidv4();
        dispatch(openModalPopup(tId,'POST',null));    
    }


  return (
      <>
       <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
         <Button onClick={openAddPost} variant="outlined" startIcon={<AddIcon />}>
                 Add Post
        </Button>
        </Typography>
        <AddPost/>
        <TableView 
        headCells={headCells}
        allRows={data}
        headerTitle={'Posts'}
        id={'postId'}
      />
      </>
      
  );
}

const headCells = [
    {
      id: 'postId',
      numeric: true,
      disablePadding: true,
      label: 'Post Id',
    },
    {
      id: 'date',
      numeric: false,
      disablePadding: false,
      label: 'Date',
    },
    {
      id: 'userId',
      numeric: false,
      disablePadding: false,
      label: 'User Id',
    },
       
    
  ];

export default Post