import  authReducer  from './auth';
import userReducer from './user';
import productReducer from './product';
import categoryReducer from './category';
import orderReducer from './order';
import pageReducer from './page';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    page: pageReducer
});

export default rootReducer;