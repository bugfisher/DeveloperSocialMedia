import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE,UPDATE_PROFILE, GET_PROFILES, GET_REPOS, NO_REPOS } from "../actions/types";

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
        case UPDATE_PROFILE:
        return{
            ...state,
            profile:payload,
            loading:false

        };

        case GET_PROFILES:
        return {
            ...state,
            profiles: payload,
            loading: false
        };

        case PROFILE_ERROR:
        return{
            ...state,
            errors:payload
        };

        case CLEAR_PROFILE:
        return{
            ...state,
            profile:null,
            repos:[],
            loading:false
        }

        case GET_REPOS:
        return {
            ...state,
            repos: payload,
            loading: false
        };
        case NO_REPOS:
        return {
            ...state,
            repos: []
        };
        default:
        return state
    }

}