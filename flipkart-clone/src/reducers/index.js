import categoryReducer from './category';
import { combineReducers } from 'redux';
import productReducer from './product';

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer
});

export default rootReducer;