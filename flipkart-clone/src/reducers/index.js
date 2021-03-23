import categoryReducer from './category';
import { combineReducers } from 'redux';
import authReducer from './auth';
import cartReducer from './cart';
import productReducer from './product';

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer
});

export default rootReducer;