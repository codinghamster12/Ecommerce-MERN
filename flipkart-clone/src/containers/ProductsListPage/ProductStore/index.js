import React, { useEffect, useState } from "react";
import { getProductsBySlug } from "../../../actions/product";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { generatePublicURL } from "../../../urlConfig";
import { Link } from 'react-router-dom';

export default function ProductStore(props) {
  const [priceRange, setPriceRange] = useState({
    under5K: 5000,
    under10K: 10000,
    under15K: 15000,
    under20K: 20000,
    under30K: 30000,
  });

  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);
  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className="storeCard">
            <div className="cardHeader">
              <div>
                {props.match.params.slug} Mobiles under {priceRange[key]}
              </div>
              <button>View All</button>
            </div>
            <div style={{ display: 'flex'}}>
              {product.productsByPrice[key].map((prod) => {
                return (
                  <Link
                  to={`/${prod.slug}/${prod._id}/p`}
                  style={{
                    display: 'block'
                  }} className="productContainer">
                    <div className="productImgContainer">
                      <img
                        src={generatePublicURL(prod.productPictures[0].img)}
                        alt="samsung-phone"
                      ></img>
                    </div>
                    <div className="productInfo">
                      <div className="title" style={{ margin: "5px 0" }}>
                        {prod.name}
                      </div>
                      <div>
                        <span>4.3</span>
                        <span>3345</span>
                      </div>
                      <div className="productPrice">{prod.price}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
