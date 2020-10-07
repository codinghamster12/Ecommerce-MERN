import { categoryConstants } from '../actions/constants';

const initState= {
    categoryList:[],
    error: null,
    loading: false,
    

}


    
    


export default (state= initState, action) => {
    switch(action.type){
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            state={
                ...state,
                loading: true
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state={
                ...state,
                categoryList: action.payload.categoryList,
                loading: false
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
            state={
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        
    }
    return state;
}