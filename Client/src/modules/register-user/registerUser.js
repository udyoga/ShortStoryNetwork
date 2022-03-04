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
import { saveUser } from '../../state/actions/userActions'

const RegisterUser = (props) => {
    const dispatch = useDispatch()

    const [userRole, setUserRole] = React.useState('');
    const { UserReducer: { modal,posting } } = useSelector(state => state)

    useEffect(()=>{       
        if(posting?.busy== false && posting?.errors==null){  
            handleClose()
        }else if(posting?.busy== false && posting?.errors) {
            alert(JSON.stringify(posting?.errors));
        }
    },[JSON.stringify(posting)])  

    useEffect(()=>{       
        if(modal?.changeKey && modal?.page=='LOGIN'){  
            handleOpen()
        }
    },[JSON.stringify(modal)])  

    const handleChangeRole = (event) => {
        setUserRole(event.target.value);
    };

    useEffect(()=>{       
        if(modal?.changeKey && modal?.page=='LOGIN'){  
            handleOpen()
        }
    },[JSON.stringify(modal)])  
   

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let user = {
            emailAddress: data.get('email'),
            passwordHash: data.get('password'),
            firstName: data.get('FirstName'),
            lastName: data.get('LastName'),
            userRole: userRole,
        };
        dispatch(saveUser(user));
    };

    const userRoles = [
        {
            value: 'U',
            label: 'Normal user',
        },
        {
            value: 'M',
            label: 'Moderator',
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
                <TextField                    
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus                   
                />                
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="FirstName"
                    label="First Name"
                    name="FirstName"
                    autoComplete="First Name"
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="LastName"
                    label="Last Name"
                    name="LastName"
                    autoComplete="Last Name"
                />
                <TextField
                    id="UserRole"
                    fullWidth
                    select
                    label="UserRole"
                    helperText="Please select user role"
                    variant="filled"
                    onChange={handleChangeRole}
                >
                    {userRoles.map((option) => (
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

export default RegisterUser