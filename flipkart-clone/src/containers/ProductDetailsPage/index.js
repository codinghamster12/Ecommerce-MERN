import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux';
import {getProductDetailsById} from '../../actions/product';

function ProductDetailsPage(props) {
    
    const dispatch = useDispatch()
    const product= useSelector(state => state.product);

    useEffect(() => {
        const { productId }= props.match.params;
        console.log('Product Id', productId)
        const payload = {
            params:{
                productId
            }
        }

        dispatch(getProductDetailsById(payload));
    }, [])
    return (
        <Layout>
            <div>
                
            Product Details Page
            {JSON.stringify(product)}

        </div>

        </Layout>
        
    )
}

export default ProductDetailsPage
