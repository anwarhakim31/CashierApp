import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavbarComp() {
  return (
    <>
      <Navbar className="navbar" data-bs-theme="dark">
        <Container className="d-flex justify-content-center p-1">
          <Navbar.Brand href="#home">
            <strong>Cashier App</strong>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComp;
