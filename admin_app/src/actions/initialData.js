import axios from "../helpers/axios";
import { categoryConstants, productConstants } from "./constants";


export const getInitialData = () => {
    return async (dispatch) => {
        
        const res= await axios.post('/initialData');
        if(res.status == 200){
            const { categoryList, products }= res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: {
                    categoryList
                }

            })
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: {
                    products
                }

            })


        }
        console.log(res);
        

    }
}