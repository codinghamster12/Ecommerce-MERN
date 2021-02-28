import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";
import { Row, Col, Container } from "react-bootstrap";
import linearCategories from "../../helpers/linearCategories";
import { useSelector, useDispatch } from "react-redux";
import { createPage } from "../../actions/page";

const NewPage = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const page = useSelector((state) => state.page);
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("");

  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value === e.target.value
    );
    setCategoryId(e.target.value);
    setType(category.type);
  };

  const submitPageForm = (e) => {
    if (title === "") {
      alert("Title is required");
      setCreateModal(false);
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);

    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });

    products.forEach((product, index) => {
      form.append("products", product);
    });

    console.log({ title, desc, categoryId, type, banners, products });

    dispatch(createPage(form));
  };

  // pass category to useEffect function, this will re render the useEffect function when the category changes.

  useEffect(() => {
    setCategories(linearCategories(category.categoryList));
  }, [category]);

  useEffect(() => {
    console.log(page);
    if (page.loading) {
      setCreateModal(false);
      setTitle('')
      setCategoryId('')
      setDesc('')
      setBanners([])
      setProducts([])
    }
  }, [page]);

  // console.log('categories:',categories)

  const handleBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  const renderCreateModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={"Create New Page"}
        handleClose={() => setCreateModal(false)}
        onSubmit={submitPageForm}
      >
        <Row>
          <Col>
            {/* <select
              className="form-control form-control-sm"
              value={categoryId}
              onChange={onCategoryChange}
            >
              <option>select category</option>
              {categories.map((cate) => (
                <option key={cate._id} value={cate._id}>
                  {cate.name}
                </option>
              ))}
            </select> */}
            <Input type="select"
            value={categoryId}
            onChange={onCategoryChange}
            options={categories}
            placeholder={'Select Category'}
            ></Input>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Page Title"}
            ></Input>
          </Col>
        </Row>

        <Row>
          <Col>
            <Input
              value={desc}
              className="form-control form-control-sm"
              onChange={(e) => setDesc(e.target.value)}
              placeholder={"Page Description"}
            ></Input>
          </Col>
        </Row>
        <Row>
          <Col>
            {banners.length > 0
              ? banners.map((banner, index) => (
                  <Row key={index}>
                    <Col>{banner.name}</Col>
                  </Row>
                ))
              : null}
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              type="file"
              className="form-control form-control-sm"
              name="banners"
              onChange={handleBannerImages}
            ></Input>
          </Col>
        </Row>
        <Row>
          <Col>
            {products.length > 0
              ? products.map((product, index) => (
                  <Row key={index}>
                    <Col>{product.name}</Col>
                  </Row>
                ))
              : null}
          </Col>
        </Row>

        <Row>
          <Col>
            <Input
              type="file"
              className="form-control form-control-sm"
              name="products"
              onChange={handleProductImages}
            ></Input>
          </Col>
        </Row>
      </Modal>
    );
  };
  return (
    <Layout sidebar>
      {page.loading ? (
        <p>Creating Page ... please wait</p>
      ) : (
        <>
          <button onClick={() => setCreateModal(true)}>Create Page</button>
          {renderCreateModal()}
        </>
      )}
    </Layout>
  );
};

export default NewPage;
