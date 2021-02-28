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
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from "react-icons/io";
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import AddCategoryModal from "./components/AddCategoriesModal";
import './style.css'

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

    if(categoryName === ""){
      alert('Category name is required')
      setShow(false)
      return
    }
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
    if(checkedIdsArray.length > 0){

      dispatch(deleteCategoriesAction(checkedIdsArray))
      .then(
        result => {
          if(result){
            dispatch(getAllCategory())
            setDeleteCategoryModal(true)
          }
        }
      )
    }
    console.log(idsArray)
  

    
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
    dispatch(updateCategories(form))
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  

  const createCategoryList = (categories, options = []) => {
    for (let cate of categories) {
      options.push({
        value: cate._id,
        name: cate.name,
        parentId: cate.parentId,
        type: cate.type
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
              <div className="actionBtnContainer">
                <span>Actions</span>
              <button onClick={handleShow}><IoIosAdd/><span>Add</span></button>
              <button onClick={deleteCategory}><IoIosTrash/><span>Delete</span></button>
            <button onClick={updateCategory}><IoIosCloudUpload/><span>Edit</span></button>

              </div>
             
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
           
          </Col>
        </Row>
      </Container>
      
      {/* Edit Category */}
      <UpdateCategoriesModal
      show={updateCategoryModal}
      handleClose= { () => setShow(false)}
      onSubmit={updateCategoriesForm}
      modalTitle={'Update Categories'}
      size="lg"
      expandedArray={expandedArray}
      checkedArray={checkedArray}
      handleCategoryInput={handleCategoryInput}
      categoryList={createCategoryList(category.categoryList)}/>
      {/* Add Category */}
      <AddCategoryModal 
      show={show}
      handleClose={() => setShow(false)}
      onSubmit={handleClose}
      modalTitle={'Add New Category'}
      parentId={parentId}
      setParentId={setParentId}
      categoryName={categoryName}
      setCategoryName={setCategoryName}
      categoryList={createCategoryList(category.categoryList)}
      handleCategoryImage={handleCategoryImage}/>
      
      

      {/* Delete Category */}
      {renderDeleteModal()}
    </Layout>
  );
};

export default Category;
