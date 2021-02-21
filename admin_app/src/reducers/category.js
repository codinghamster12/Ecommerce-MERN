import { categoryConstants } from '../actions/constants';

const initState= {
    categoryList:[],
    error: null,
    loading: false,
    category:{
        name: '',
        parentId: '',
        categoryImage: ''
    }

}

const buildNewCategories =  (parentId, categories, category) => {
    let myCategories=[]

    if(parentId == undefined){
       return[
        ...categories,
        {
            _id: category._id,
            name: category.name,
            slug: category.slug,
            children: []
        }

    ]
      

       
           
    
    }
    for(let cate of categories){
        if(cate._id == parentId)
        {
            const newCategory= {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                children: []
            }
        
        myCategories.push({
            ...cate,
            children: cate.children  ? [...cate.children, newCategory]: [newCategory]


        })
    }
        else{
            myCategories.push({
                ...cate,
                children: cate.children  ? buildNewCategories(parentId, 
                cate.children, category): []
        })

    }
    

}
return myCategories;

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
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state={
                ...state,
                loading: true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const parentId= action.payload.category.parentId
            const updatedCategories= buildNewCategories(parentId, state.categoryList,action.payload.category);
            console.log('updatedCategories',updatedCategories);
            state={
                ...state,
                categoryList: updatedCategories,
                loading: false
                

            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state={
                ...state,
                error: action.payload.error,
                loading: false
            }
    }
    return state;
}