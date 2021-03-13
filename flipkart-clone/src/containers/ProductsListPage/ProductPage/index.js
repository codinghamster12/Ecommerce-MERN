import React, { useEffect } from "react";
import getParams from "../../../utils/getParams";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../../../actions/product";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { generatePublicURL } from "../../../urlConfig";
import Card from '../../../components/UI/Card'

export default function ProductPage(props) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { page } = product;

  useEffect(() => {
    const params = getParams(props.location.search);
    console.log({ params });

    const payload = {
      params,
    };
    dispatch(getProductPage(payload));
  }, []);

  return (
    <div style={{ margin: "0 10px" }}>
      <h3>{page.title}</h3>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => (
            <a
              key={index}
              style={{ display: "block" }}
              href={banner.navigateTo}
            >
              <img src={generatePublicURL(banner.img)} alt="" />
            </a>
          ))}
      </Carousel>
      <div style={{
          display: 'flex',
          
      }}>
        {page.products &&
          page.products.map((product, index) => (
            <Card key={index}>
              <img style={{width: '100%',height: '100%', display: 'block', margin: '0 auto'}} src={generatePublicURL(product.img)} alt="" />
            </Card>
          ))}
      </div>
    </div>
  );
}
