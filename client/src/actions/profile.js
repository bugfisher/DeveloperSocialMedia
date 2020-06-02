import axios from 'axios';
import {setAlert} from './alert'
import { GET_PROFILE, PROFILE_ERROR } from './types';



//Function to get user profile

export const getProfile = () => async dispatch =>{

    try {
        
        const res = await axios.get('/api/profile/me');

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{
                msg:err.response.statusText,
                status:err.response.status
            }
        })
    }

}