import { authConstants } from "./constants"
import axios from "../helpers/axios"

export const login = (user) => {


    return async (dispatch) => {
        
        dispatch({ type: authConstants.LOGIN_REQUEST });
        try{
            const res= await axios.post(`/admin/signin`, {
                ...user
            });
           
            
    
                if(res.status == 200){
                    const {token, user} = res.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    console.log(user);
                    dispatch({
                        type: authConstants.LOGIN_SUCCESS,
                        payload: {
                            token,
                            user
                        }
                    })
        
                }
                else{
                    if(res.status == 400){
                        dispatch({
                            type: authConstants.LOGIN_FAILURE,
                            payload: {
                                error: res.data
                            }
                        })

                    }
                }
                

        }
        
            
        
        catch(error){
            console.log(error)
            if(error.response.status == 400){
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: {
                        error: error.response.data
                    }
                })
            }
            
            
        }
    }
        
        

        


       
    }

export const isUserLoggedIn= () => {
    return async (dispatch) => {
        const token= localStorage.getItem('token');
        if(token){
            const user= JSON.parse(window.localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,
                    user
                }
            })
        }
        else{
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload:{
                    error: 'Failed to login'
                }
            })
        }
    }
}

export const signout = () => {
  
    return async dispatch => {
        dispatch({
            type: authConstants.LOGOUT_REQUEST
        })
        try{
            const res= await axios.post(`/admin/signout`)
        if(res.status == 200){
            localStorage.clear();
            dispatch({
                type: authConstants.LOGOUT_SUCCESS
                
            })
        }

        }
        catch(error){
            if(error.response.status == 400){
                dispatch({
                    type: authConstants.LOGOUT_FAILURE,
                    payload: error.response.data.error
                })

            }
            

        }
        
        
        
        
    }
}