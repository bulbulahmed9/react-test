import React, { useState } from 'react'
import { Navbar, Nav, Modal } from 'react-bootstrap'
import gql from 'graphql-tag'
import { useMutation } from "@apollo/react-hooks";
import { get_user } from '../SecondCol/SecondCol'
import {Link} from 'react-router-dom'

import './navmenu.css'



const create_user = gql`
mutation MyMutation($name: String!, $address: String!) {
    createUser(payload: {name: $name, address: $address}) {
      id
      data {
        address
        name
      }
    }
  }
`;


const NavMenu = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        name: "",
        address: ""
    })

    const updateCache = (cache, { data }) => {

        // Fetch the user from the cache
        const existingUsers = cache.readQuery({
            query: get_user
        });
        console.log(existingUsers)
        // Add the new user to the cache
        const newUser = data.createUser;
        console.log(newUser)
        cache.writeQuery({
            query: get_user,
            data: { users: [newUser, ...existingUsers.users] }
        });
    };

    const [createUser] = useMutation(create_user, { update: updateCache });

    return (
        <div className="navbar">
            <Navbar expand="sm">
                <Link to="/"><Navbar.Brand>React GraphQL</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className="nav-link" to="/">CRUD</Link>
                        <Link className="nav-link" to="/blank" >Blank</Link>
                        <Nav.Link onClick={handleShow}>Create User</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/* Create User modal  */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        createUser({
                            variables: { name: formData.name, address: formData.address },
                            optimisticResponse: true,
                        })
                        handleClose()
                        setFormData({
                            name: "",
                            address: ""
                        })
                    }} className="nav-form">
                        <div className="name">
                            <label>Name</label>
                            <input onChange={(e) => setFormData({ ...formData, name: e.target.value })} value={formData.name} type="text" />
                        </div>
                        <div className="address">
                            <label>Address</label>
                            <input onChange={(e) => setFormData({ ...formData, address: e.target.value })} value={formData.address} type="text" />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default NavMenu
