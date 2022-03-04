import React,{useState,useEffect, useCallback} from "react"
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {BrowserRouter, Route,Switch,useHistory,Link} from 'react-router-dom'
import User from "../user";
import Post from "../posts";
import StateVowel from "../stat-vowel/StateVowel";
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import { logout } from '../../state/actions/userActions'
import { useDispatch,useSelector } from 'react-redux';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Home = (props) =>{

  const dispatch = useDispatch()

  const history = useHistory()
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const {UserReducer:{status,usersession,data}}=useSelector(state=>state)   

  useEffect(()=>{
    console.log('usersession',usersession)   
    
   
    
  },[])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };  

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login')
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{position: "relative", width:"100%", }}>

          <div style={{position: "absolute", left:"0", top: "-14px"}}>
          <div style={{fontSize: "16px", textTransform:"uppercase"}}>
            Short Story Network
          </div>
          </div>
          
          <div style={{position: "absolute", right:"0", top: "-14px"}}>
          <span style={{margin: "0 10px 0 0",}}>Welcome {usersession?.email}</span>
         
          <IconButton
            color="inherit"
            aria-label="Logout"
            onClick={handleLogout}                       
          > <span style={{position: "absolute",}}>
          <LogoutIcon/></span>
          </IconButton>
          
          </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <Link to={'/posts'}>
        <ListItem button key={'Posts'}>
              <ListItemIcon>
                <ArtTrackIcon />                
              </ListItemIcon>
              <ListItemText primary={'Posts'} />
        </ListItem>
        </Link>
        <Link to={'/writers'}>
        <ListItem button key={'writers'}>
              <ListItemIcon>
                <GroupIcon />                
              </ListItemIcon>
              <ListItemText primary={'Writers'} />
        </ListItem>
        </Link>
        {usersession?.role=='M' ?
        <Link to={'/stat-vowel'}>
        <ListItem button key={'StatVowel'}>
              <ListItemIcon>
                <AlignVerticalBottomIcon />                
              </ListItemIcon>
              <ListItemText primary={'Stat Vowel'} />
        </ListItem>
        </Link> : <></>}
        </List> 
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader /> 
          <Switch>
            <Route path="/writers" component={User}/> 
            <Route path="/stat-vowel" component={StateVowel}/> 
            <Route path="/posts" component={Post}/>       
          </Switch>
      </Box>
    </Box>
  );  
} 

export default Home






