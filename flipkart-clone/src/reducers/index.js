import categoryReducer from './category';
import { combineReducers } from 'redux';
import authReducer from './auth';
import productReducer from './product';

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    auth: authReducer
});

export default rootReducer;