import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

function NavbarComp({ toggleSide }) {
  return (
    <>
      <Navbar className="navbar" data-bs-theme="dark">
        <Container className="p-1">
          <Navbar.Brand href="/">
            <strong>Cashier App</strong>
          </Navbar.Brand>
          <Nav>
            <h2
              className="text-end text-white burger"
              style={{ cursor: "pointer" }}
              onClick={() => toggleSide()}
            >
              <FontAwesomeIcon icon={faBars} />
            </h2>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComp;
