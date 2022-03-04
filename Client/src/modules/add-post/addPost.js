import React,{useState,useEffect} from "react"
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import {savePost,searchPosts} from '../../state/actions/userActions'

const AddPost = (props) =>{    

    const dispatch = useDispatch()    
    const { UserReducer: { modal,usersession } } = useSelector(state => state)

    useEffect(()=>{       
        if(modal?.changeKey && modal?.page=='POST'){            
            handleOpen()
        }
    },[modal?.changeKey])  
    
    

  const [userRole, setUserRole] = React.useState('');

  const handleChangeRole = (event) => {
    setUserRole(event.target.value);
  };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);        

        let post = {
            Post1: data.get('post'),
            UserId: usersession?.Id
        };
        dispatch(savePost(post));

        handleClose()
    };
    

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return <>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
     <Box component="form" onSubmit={handleSubmit} noValidate sx={style}>
     <TextField style={{ height: 100 }}
          id="post"
          name="post"
          label="Enter your post"
          placeholder="Enter your post"
          multiline
          fullWidth 
        />       
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Add Post
                    </Button>                    
                </Box>
  </Modal>
    </> 
}

export default AddPost