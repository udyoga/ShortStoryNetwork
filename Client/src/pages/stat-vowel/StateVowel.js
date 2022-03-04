import React,{useState,useEffect} from "react"
import { useDispatch,useSelector } from 'react-redux';
import TableView from "../../utils/table-view/table-view"
import { searchStateVowel } from '../../state/actions/userActions'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AddPost from '../../modules/add-post'

const StateVowel = (props)=>{     
    const dispatch = useDispatch()
    const {UserReducer:{data}}=useSelector(state=>state)    
    let rows = [];

    useEffect(()=>{
        dispatch(searchStateVowel());
    },[])  

    

  return (
      <>          
        <TableView 
        headCells={headCells}
        allRows={data}
        headerTitle={'State Vowels'}
      />
      </>
      
  );
}

const headCells = [
    {
      id: 'id',
      numeric: true,
      disablePadding: true,
      label: 'ID',
    },
    {
      id: 'date',
      numeric: false,
      disablePadding: false,
      label: 'Date',
    },
    {
      id: 'pairVowelCount',
      numeric: false,
      disablePadding: false,
      label: 'Pair Vowel Count',
    },
    {
        id: 'singleVowelCount',
        numeric: false,
        disablePadding: false,
        label: 'Single Vowel Count',
    }, 
    {
        id: 'totalWordCount',
        numeric: false,
        disablePadding: false,
        label: 'Total Word Count',
    },      
    
  ];

export default StateVowel