import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
      REGISTER_USER_REQUEST,
      REGISTER_USER_SUCCESS,
      REGISTER_USER_FAIL, 
      LOAD_USER_REQUEST,
      LOAD_USER_SUCCESS,
      LOAD_USER_FAIL,
      LOGOUT_SUCCESS,
      LOGOUT_FAIL,
      CLEAR_ERRORS,
      UPDATE_PROFILE_REQUEST,
      UPDATE_PROFILE_SUCCESS,
      UPDATE_PROFILE_FAIL,
      UPDATE_PROFILE_RESET,
  
    } from "../constants/userConstants";

    import axios from 'axios'
import { Typography } from "@material-ui/core";



//login
    export const login = (email,password)=>async(dispatch,getState)=>{

        try{ 
            dispatch({type:LOGIN_REQUEST})
            
            const config = { headers:{"Content-Type":"application/json"}}

            const {data}  = await axios.post ( 
                `/api/v1/login`, 
                {email,password},
                config
                );
                dispatch({type:LOGIN_SUCCESS,payload:data.user})

                localStorage.setItem("comuser",JSON.stringify(getState().user))

        }catch(error){
            dispatch({
                type:LOGIN_FAIL,
                payload:error.response.data.message
            
            })
        }


    };



// register 

    export const register = (userData) =>async(dispatch)=>{
      
        try{
            dispatch({type:REGISTER_USER_REQUEST});


            const config = {headers:{"Content-Type":"multipart/form-data"}}

            const {data } = await axios.post(`/api/v1/register`,userData,config)
            

            dispatch({type:REGISTER_USER_SUCCESS,
              payload:data.user})

        }catch(error){
            dispatch({
                type:REGISTER_USER_FAIL,
                payload:error.response.data.message
            
            })
        }

        
    }


    //load user


    export const loadUser = () => async(dispatch) => {
      try {
        dispatch({ type: LOAD_USER_REQUEST });
        const {data}   = await axios.get(`/api/v1/me`);
 
  console.log(data)
        dispatch({ type: LOAD_USER_SUCCESS, payload:data });
        
      } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
      }
      
    };


    
// Logout User
export const logout = () => async (dispatch) => {
    try {
      await axios.get(`/api/v1/logout`);
  
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
  };


  // Update Profile 

  export const updateProfile = (userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.put(`/api/v1/me/update`, userData, config);
  
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//clearing errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
