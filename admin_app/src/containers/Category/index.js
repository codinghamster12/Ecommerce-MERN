import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../actions/category";
import Modal from "../../components/UI/Modal";

const Category = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentId, setParentId] = useState("");
  const [image, setImage] = useState("");
  const handleClose = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentId);
    form.append("categoryImage", image);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentId("");
    setImage("");

    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let cate of categories) {
      myCategories.push(
        <li key={cate.name}>
          {cate.name}
          {cate.children.length > 0 ? (
            <ul>{renderCategories(cate.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let cate of categories) {
      options.push({ value: cate._id, name: cate.name });
      if (cate.children.length > 0) {
        createCategoryList(cate.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Layout sidebar>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>{renderCategories(category.categoryList)}</ul>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Category"}
      >
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              value={categoryName}
              placeholder="Enter Category name"
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Form.Group>
          <select
            className="form-control"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          >
            <option>select category</option>
            {createCategoryList(category.categoryList).map((cate) => {
              return (
                <option key={cate.value} value={cate.value}>
                  {cate.name}
                </option>
              );
            })}
          </select>
          <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
          ></input>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Category;
