import axios from "../helpers/axios"
import { categoryConstants } from "./constants";
import PrivateRoute from "../components/HOC/PrivateRoute";

export const getAllCategory = () => {
    return async dispatch => {
        dispatch({
            type: categoryConstants.GET_ALL_CATEGORIES_REQUEST
        })
        const res= await axios.get('/category/getCategories');
        console.log(res);

        if(res.status == 200){
            const {categoryList} = res.data;
            console.log(categoryList);
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: {
                    categoryList
                }
            })
        }
        else{
            if(res.status == 400){
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                    payload: res.data.error
                })
            }
        }
    }
}

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({
            type: categoryConstants.ADD_NEW_CATEGORY_REQUEST
        })
        const res= await axios.post('/category/create', form);
        console.log(res);
        if(res.status == 201){
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                payload: 
                {
                    category: res.data.category
                }
            })

        }
        else{
            if(res.status == 400){
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                    payload: res.data.error
                })
            }
        }
        
    }
}