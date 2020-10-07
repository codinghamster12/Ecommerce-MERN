import  authReducer  from './auth';
import userReducer from './user';
import productReducer from './product';
import categoryReducer from './category';
import orderReducer from './order';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    order: orderReducer,
    category: categoryReducer
});

export default rootReducer;