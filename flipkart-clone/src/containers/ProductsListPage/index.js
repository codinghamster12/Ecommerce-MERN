import React from "react";
import Layout from "../../components/Layout";
import ProductStore from "./ProductStore";
import ProductPage from "./ProductPage";
import getParams from "../../utils/getParams";

const ProductsListPage = (props) => {

  const renderProduct= () => {
    console.log(props)
    const params= getParams(props.location.search);
    let content= null;
    console.log(params);
    switch(params.type){
      case 'store':
        content= <ProductStore {...props}></ProductStore>;
        break;
      
      case 'page':
        content= <ProductPage {...props}></ProductPage>;
        break;
      default:
        content= null;
      


    }

    return content;
  }
  return (
    <Layout>
      {renderProduct()}
    </Layout>
  );
};

export default ProductsListPage;
