import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
  return async (dispatch) => {
    try{
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_REQUEST,
      });
      const res = await axios.get("/category/getCategories");
      console.log(res);
  
      if (res.status == 200) {
        const { categoryList } = res.data;
        console.log(categoryList);
        dispatch({
          type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
          payload: {
            categoryList,
          },
        });
      } 

    }
    catch(error){
      if(error.response.status == 400){
        dispatch({
          type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
          payload:{
            error: error.response.data.error
          }
        })
      }
    }
    
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstants.ADD_NEW_CATEGORY_REQUEST,
    });
    try{
      const res = await axios.post("/category/create", form);
   
    if (res.status == 201) {
      dispatch({
        type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
        payload: {
          category: res.data.category,
        },
      });
    } 
  }
    
    catch(error){
      if(error.response.status == 500){
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
          payload: {
            error: error.response.data.error
          }
        })
      }

    }
    }
  };


export const updateCategories = (form) => {
  return async (dispatch) => {

      try{
        dispatch({
          type:categoryConstants.UPDATE_CATEGORIES_REQUEST
        })

        const res = await axios.post("/category/update", form);
        if(res.status == 201){
          dispatch({
            type:categoryConstants.UPDATE_CATEGORIES_SUCCESS
          })
          dispatch(getAllCategory());
        }
      }
      catch(error){
        dispatch({
          type:categoryConstants.UPDATE_CATEGORIES_FAILURE,
          payload: { error }
        })

      }

    

   
  };
};

export const deleteCategories = (ids) => {
  return async (dispatch) => {

      try{
        dispatch({
          type: categoryConstants.DELETE_CATEGORIES_REQUEST
        })

        const res = await axios.post("/category/delete", {
          payload: {
            ids
          }

        });
        if(res.status == 200){
          dispatch(getAllCategory())
          dispatch({
            type: categoryConstants.DELETE_CATEGORIES_SUCCESS
          })
        }
        
        
        
      }
      catch(error){
          dispatch({
            type: categoryConstants.DELETE_CATEGORIES_FAILURE,
            payload: { error: error.response.data.error }
          })

      }

    

   
  };
};
