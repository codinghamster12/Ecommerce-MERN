import axios from "../helpers/axios"
import { categoryConstants } from "./constants";

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

