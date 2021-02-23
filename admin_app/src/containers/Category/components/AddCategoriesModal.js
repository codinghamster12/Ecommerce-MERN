import React from 'react';
import Modal from "../../../components/UI/Modal";
import Input from "../../../components/UI/Input";
import { Row, Col, Form } from "react-bootstrap";

const AddCategoryModal = (props) => {
    const { show, handleClose, modalTitle, categoryName, setCategoryName, parentId, setParentId, handleCategoryImage, categoryList }= props
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={modalTitle}
      >
       
        <Form>
        <Row>
          <Col>
         
            <Input
              type="text"
              value={categoryName}
              placeholder="Enter Category name"
              onChange={(e) => setCategoryName(e.target.value)}
              className="form-control-sm"
            />
          
          </Col>
          <Col>
          <select
            className="form-control form-control-sm"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
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
          </Row>
          <Row>
          <Col>
          <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
          ></input>
          </Col>
        </Row>
          
          
        
        </Form>
      </Modal>
    );
  };

  export default AddCategoryModal