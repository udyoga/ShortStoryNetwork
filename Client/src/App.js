import logo from './logo.svg';
import './App.css';
import {useSelector,Provider} from 'react-redux'
import { store } from './state/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import Main from './pages/main';
import {BrowserRouter} from 'react-router-dom'

axios.defaults.baseURL = 'https://localhost:44377/Api/';

//store.dispatch(loadLoggedinUser());

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
       <Provider store={store}>
       <BrowserRouter>
     <Main/>
     </BrowserRouter>
    </Provider>
    </ThemeProvider>
  );
  }

export default App;
