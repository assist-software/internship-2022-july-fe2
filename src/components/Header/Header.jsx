import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/logo/logo-assist-tagline.png";
import { Button } from "react-bootstrap";
import Dropdown from "../Dropdown/Dropdown";
import { Form } from "react-bootstrap";
import heart from "../../assets/icons/heart.svg";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Navbar collapseOnSelect expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} className={styles.assist} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <div style={{ width: "160px" }}>
              <Dropdown
                fontWeight="semibold"
                fontSize="buton"
                className={styles.drop}
              />
            </div>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className={styles.search}
                aria-label="Search"
              />
            </Form>
          </Nav>
          <Nav>
            <Button className={styles.favorites}>
              <img src={heart} />
              Favourites
            </Button>
            <NavDropdown title="My profile" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
