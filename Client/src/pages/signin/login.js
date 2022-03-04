import React,{useState,useEffect} from "react"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LockOutlined } from '@mui/icons-material'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { loginUser,openModalPopup } from '../../state/actions/userActions'
import { useDispatch,useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import RegisterUser from '../../modules/register-user'
import { v4 as uuidv4 } from "uuid";

const Signin = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const {UserReducer:{status,session}}=useSelector(state=>state)    

    
    useEffect(()=>{        
        if(status == 1){           
            history.push('/')
        }            
    },[status])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        dispatch(loginUser({
            EmailAddress: data.get('email'),
            PasswordHash: data.get('password')
        }));       
    };

    const openRegistration = () =>{
        const tId = uuidv4();
        dispatch(openModalPopup(tId,'LOGIN',null));    
    }

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>                           
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={openRegistration}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <RegisterUser/>
        </Container>
    );
}

export default Signin