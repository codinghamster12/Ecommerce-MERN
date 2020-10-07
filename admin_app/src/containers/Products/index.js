import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/product";
import Modal from "../../components/UI/Modal";
import './style.css'
import { generatePublicURL } from '../../urlConfig';

const Products = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const cat = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const [productDetails, setProductDetails]= useState({});

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("productDescription", description);
    form.append("category", category);

    for (let pic of productImages) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form));

    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleProductPicture = (e) => {
    setProductImages([...productImages, e.target.files[0]]);
  };

  const handleCloseProductDetailModal = () => {
    setProductDetailModal(false);
  };

  const showProductDetailModal = (product) => {
    setProductDetailModal(true);
    setProductDetails(product);
  };
  const renderProductDetailsModal = () => {
    if(!productDetailModal){
      return null;
    }
    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailModal}
        modalTitle={"Product Details"}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.productDescription}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Product Pictures</label>
            <div style={{display: 'flex'}}>
            {productDetails.productPictures.map(picture => {
              return(
    
                <div className="productImgContainer">
                  <img src={generatePublicURL(picture.img)}></img>
                </div>
                
              )
            })}         

            </div>
                 
         
              
          </Col>
        </Row>
      </Modal>
    );
  };

  const createCategoryList = (categories, options = []) => {
    for (let cate of categories) {
      options.push({
        value: cate._id,
        name: cate.name,
      });
      if (cate.children && cate.children.length > 0) {
        createCategoryList(cate.children, options);
      }
    }
    return options;
  };
  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Product"}
      >
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              label="Name"
              value={name}
              placeholder="Enter Product name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              label="Quantity"
              value={quantity}
              placeholder="Enter Quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              label="Price"
              value={price}
              placeholder="Enter Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              label="Description"
              value={description}
              placeholder="Enter Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>select category</option>
            {createCategoryList(cat.categoryList).map((cate) => {
              return (
                <option key={cate.value} value={cate.value}>
                  {cate.name}
                </option>
              );
            })}
          </select>

          <Form.Group>
            <Form.Control
              type="file"
              label="Product Picture"
              onChange={handleProductPicture}
            />
          </Form.Group>
          {productImages.length > 0
            ? productImages.map((pic) => {
                return <div>{pic.name}</div>;
              })
            : null}
        </Form>
      </Modal>
    );
  };

  const renderProducts = () => {
    return (
      <Table style={{fontSize: 12}} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        {product.products.length > 0
          ? product.products.map((prod) => {
              return (
                <tbody>
                  <tr>
                    <td>1</td>
                    <td onClick={() => showProductDetailModal(prod)}>{prod.name}</td>
                    <td>{prod.price}</td>
                    <td>{prod.quantity}</td>
                    <td>{prod.category.name}</td>
                  </tr>
                </tbody>
              );
            })
          : null}
      </Table>
    );
  };

  return (
    <Layout sidebar>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;
