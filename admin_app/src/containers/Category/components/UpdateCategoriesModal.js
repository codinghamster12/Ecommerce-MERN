import React from 'react';
import Modal from "../../../components/UI/Modal";
import Input from "../../../components/UI/Input";
import { Row, Col, Form } from "react-bootstrap";


const UpdateCategoriesModal = (props) => {
    const { show, handleClose, modalTitle, size, expandedArray, checkedArray, handleCategoryInput, categoryList } = props
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={modalTitle}
        size={size}
       
      >
        <Form>
          <Row>
            <Col>
              <h6>Expanded</h6>
            </Col>
          </Row>
          {expandedArray.length > 0 &&
            expandedArray.map((item, index) => {
              return (
                <Row key={index}>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        value={item.name}
                        placeholder="Enter Category name"
                        onChange={(e) =>
                          handleCategoryInput(
                            "name",
                            e.target.value,
                            index,
                            "expanded"
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <select
                      className="form-control"
                      value={item.parentId}
                      onChange={(e) =>
                        handleCategoryInput(
                          "parentId",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                    >
                      <option>select category</option>
                      {categoryList.map((cate) => {
                        return (
                          <option key={cate.value} value={cate.value}>
                            {cate.name}
                          </option>
                        );
                      })}
                    </select>
                  </Col>
                  <Col>
                    <select className="form-control">
                      <option value="">Select Type</option>
                      <option value="store">Store</option>
                      <option value="product">Product</option>
                      <option value="page">Page</option>
                    </select>
                  </Col>
                </Row>
              );
            })}

          {/* <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
          ></input> */}
          <Row>
            <Col>
              <h6>Checked Categories</h6>
            </Col>
          </Row>
          {checkedArray.length > 0 &&
            checkedArray.map((item, index) => {
              return (
                <Row key={index}>
                  <Col>
                    
                      <Input
                        type="text"
                        value={item.name}
                        placeholder="Enter Category name"
                        onChange={(e) =>
                          handleCategoryInput(
                            "name",
                            e.target.value,
                            index,
                            "checked"
                          )
                        }
                      />
                    
                  </Col>
                  <Col>
                    <select
                      className="form-control"
                      value={item.parentId}
                      onChange={(e) =>
                        handleCategoryInput(
                          "parentId",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                    >
                      <option>select category</option>
                      {categoryList.map((cate) => {
                        return (
                          <option key={cate.value} value={cate.value}>
                            {cate.name}
                          </option>
                        );
                      })}
                    </select>
                  </Col>
                  <Col>
                    <select className="form-control">
                      <option value="">Select Type</option>
                      <option value="store">Store</option>
                      <option value="product">Product</option>
                      <option value="page">Page</option>
                    </select>
                  </Col>
                </Row>
              );
            })}
        </Form>
      </Modal>
    );
  };

  export default UpdateCategoriesModal