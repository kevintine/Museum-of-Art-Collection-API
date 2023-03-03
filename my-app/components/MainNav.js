import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function MainNav() {
  const router = useRouter()
  const [formData, setFormData] = useState("")
  const handleChange = (e) => {
    setFormData(e.target.value)
}
const handleSubmit = (e) => {
    e.preventDefault()
    const route = `/artwork?title=true&q=${formData} `
    setFormData("")
    router.push(route)
}
  return (
    <>
    <Navbar className="fixed-top navbar-dark bg-primary" expand="lg">
        <Container>
        <Navbar.Brand>Kevin-Tran</Navbar.Brand>
            <Nav className='col-sm'>
                <Link href="/" passHref legacyBehavior><Nav.Link>Home</Nav.Link></Link>
                <Link href="/search" passHref legacyBehavior><Nav.Link>Advanced Search</Nav.Link></Link>      
            </Nav>    
            <Nav className="d-flex">
            <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
                                type="search"
                                placeholder="Artwork Title"
                                className="me-2"
                                aria-label="Search"
                                onChange={handleChange}
                                value={formData}
                            />
                <Button className="outline-success">Search</Button>
            </Form>
            </Nav>
        </Container>
    </Navbar>
    <br></br>
    <br></br>
  </>
  )
}
