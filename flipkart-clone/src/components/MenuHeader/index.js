import React, { useEffect } from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../actions/category';


const MenuHeader = (props) => {
    const category = useSelector(state => state.category);
    const dispatch= useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, [])
    const renderCategories = (categories) => {
        let myCategories = [];
        for (let cate of categories) {
          myCategories.push(
            <li key={cate.name}>
                {cate.parentId ? <a href={`/${cate.slug}?cid=${cate._id}&type=${cate.type}`}>{cate.name}</a>:
                <span>{cate.name}</span>}
              {cate.children.length > 0 ? (
                <ul>{renderCategories(cate.children)}</ul>
              ) : null}
            </li>
          );
        }
        return myCategories;
      };
    return (
        <div className="menuHeader">
            <ul>
                {category.categoryList.length > 0 ? renderCategories(category.categoryList) : null}
            </ul>
        </div>
    )
}

export default MenuHeader
