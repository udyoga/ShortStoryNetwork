import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import { updateUser } from '../../state/actions/userActions'
import { InputLabel } from '@mui/material';

const UpdateUser = (props) => {

  const dispatch = useDispatch()

  const { UserReducer: { modal } } = useSelector(state => state)
  const [selectedUser, setselectedUser] = useState('');
  const [isBanded, setIsBanded] = React.useState(false);
  const [isEditor, setIsEditor] = React.useState(false);

  useEffect(() => {
    if (modal?.changeKey && modal?.page == 'USER') {
      handleOpen()
      setselectedUser(modal?.object);
    }
  }, [JSON.stringify(modal)]) 

  const handleChangeEditor = (event) => {
    setIsEditor(event.target.value);
  };

  const handleChangeBanded = (event) => {
    setIsBanded(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();   

    let user = {     
      UserId: selectedUser?.userId,
      IsBanned: isBanded,
      IsEditor: isEditor,
    }; 
    dispatch(updateUser(user));    
    handleClose();
  };

  const selEditor = [
    {
      value: true,
      label: 'Editor',
    },
    {
      value: false,
      label: 'Non-Editor',
    },
  ];

  const selBanned = [
    {
      value: true,
      label: 'Banned',
    },
    {
      value: false,
      label: 'Unbanned',
    },
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
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
        <div>
          {selectedUser?.emailAddress}
        </div>
        <TextField
          id="IsBanned"
          fullWidth
          select
          label="IsBanned"
          helperText="Banned"
          variant="filled"
          onChange={handleChangeBanded}
        >
          {selBanned.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="IsEditor"
          fullWidth
          select
          label="IsEditor"
          helperText="Editor"
          variant="filled"
          onChange={handleChangeEditor}
        >
          {selEditor.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
      </Box>
    </Modal>
  </>
}

export default UpdateUser