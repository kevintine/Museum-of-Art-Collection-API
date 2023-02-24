import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function MainNav() {
  return (
    <>
    <Navbar className="fixed-top navbar-dark bg-primary" expand="lg">
        <Container>
        <Navbar.Brand>Kevin-Tran</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="d-flex">
            <Link href="/" passHref legacyBehavior><Nav.Link>Home</Nav.Link></Link>
            <Link href="/search" passHref legacyBehavior><Nav.Link>Advanced Search</Nav.Link></Link>
            <Form className="d-flex">
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
            </Nav>
        </Container>
    </Navbar>
    <br></br>
    <br></br>
  </>
  )
}
