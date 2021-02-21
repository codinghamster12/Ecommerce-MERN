import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getAllCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction
} from "../../actions/category";
import Modal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoMdCheckboxOutline,
  IoMdCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";

const Category = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentId, setParentId] = useState("");
  const [image, setImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

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

  const handleCategoryInput = (key, value, index, type) => {
    console.log(index);
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
    console.log({ checkedArray, expandedArray });
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let cate of categories) {
      myCategories.push({
        label: cate.name,
        value: cate._id,
        children: cate.children.length > 0 && renderCategories(cate.children),
      });
    }
    return myCategories;
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);
    console.log(idsArray)
    dispatch(deleteCategoriesAction(idsArray))
    .then(
      result => {
        if(result){
          dispatch(getAllCategory())
          setDeleteCategoryModal(true)
        }
      }
    )

    
  };

  const renderDeleteModal = () => {
    return (
      <Modal
        modalTitle={"Confirm"}
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              setDeleteCategoryModal(false)
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </Modal>
    );
  };

  const renderAddCategoryModal = () => {
    return (
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
    );
  };

  const updateCategoriesForm = () => {
    setUpdateCategoryModal(false);
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategories(form)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
      }
    });
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const renderUpdateCategoriesModal = () => {
    return (
      <Modal
        show={updateCategoryModal}
        handleClose={updateCategoriesForm}
        modalTitle={"Update Categories"}
        size="lg"
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
                      {createCategoryList(category.categoryList).map((cate) => {
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
                            "checked"
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
                          "checked"
                        )
                      }
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

  const createCategoryList = (categories, options = []) => {
    for (let cate of categories) {
      options.push({
        value: cate._id,
        name: cate.name,
        parentId: cate.parentId,
      });
      if (cate.children.length > 0) {
        createCategoryList(cate.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setImage(e.target.files[0]);
  };

  const updateCategory = () => {
    setUpdateCategoryModal(true);
    updateCheckedAndExpandedCategories();
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categoryList);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);

    console.log({ checked, expanded, categories, checkedArray, expandedArray });
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
            {/* <ul>{renderCategories(category.categoryList)}</ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categoryList)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoMdCheckbox />,
                uncheck: <IoMdCheckboxOutline />,
                halfCheck: <IoMdCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <button onClick={deleteCategory}>Delete</button>
            <button onClick={updateCategory}>Edit</button>
          </Col>
        </Row>
      </Container>
      {/* Add Category */}
      {renderAddCategoryModal()}
      {/* Edit Category */}
      {renderUpdateCategoriesModal()}

      {/* Delete Category */}
      {renderDeleteModal()}
    </Layout>
  );
};

export default Category;
