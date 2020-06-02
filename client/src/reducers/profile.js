import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";

const intialState = {
    profile:null,
    profiles:[],
    repos:[],
    loading:false,
    errors:{}
}


export default function(state = intialState,action) {

    const {type,payload} = action;

    switch(type)
    {
        case GET_PROFILE:
        return{
            ...state,
            profile:payload,
            loading:false

        };

        case PROFILE_ERROR:
        return{
            ...state,
            errors:payload
        };
        default:
        return state
    }

}