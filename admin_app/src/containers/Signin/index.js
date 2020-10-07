import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Layout from "../../components/Layout/index";
import { login }  from '../../actions/';
import { useDispatch,useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


export default function Signin() {

  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [error, setError]= useState('');
  const auth= useSelector(state => state.auth);

  const dispatch = useDispatch();



  const userLogin= (e) => {

    e.preventDefault();

    const user= {
      email, password
    }

    dispatch(login(user));

  }
  if(auth.authenticate){
    return <Redirect to={"/"}></Redirect>
  }
    return (
        <>
        <Layout>
        
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit= {userLogin}>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
  
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Layout>
      </>
        
    )
}
