import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Dropdown } from "react-bootstrap";
import logo from "../../assets/logo/logo-assist-tagline.png";
import { Button } from "react-bootstrap";
import DropdownComp from "../Dropdown/Dropdown";
import { Form } from "react-bootstrap";
import { ReactComponent as Heart } from "../../assets/icons/heart.svg";
import { ReactComponent as Person } from "../../assets/icons/person.svg";
import { ReactComponent as Security } from "../../assets/icons/security.svg";
import { ReactComponent as Bell } from "../../assets/icons/bell.svg";
import { ReactComponent as Chat } from "../../assets/icons/chat.svg";
import { ReactComponent as Logout } from "../../assets/icons/logout.svg";
import { ReactComponent as Loop } from "../../assets/icons/magnifying-glass.svg";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const categories = [
    { value: "", label: "Category" },
    { value: "big", label: "Big Houses" },
    { value: "small", label: "Small Houses" },
    { value: "office", label: "Offices" },
    { value: "apartment", label: "Apartments" },
  ];
  return (
    <Navbar collapseOnSelect expand="xl" className={styles.navbar} sticky="top">
      <Container className={styles.content}>
        <Navbar.Brand onClick={() => navigate("/")}>
          <img src={logo} className={styles.assist} alt="Assist header logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <div style={{ display: "inline-flex" }}>
              <div className={styles.category}>
                <DropdownComp
                  fontWeight="semibold"
                  fontSize="buton"
                  title="Category"
                  className={styles.drop}
                  options={categories}
                />
              </div>
              <Form className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className={styles.search}
                  aria-label="Search"
                />
                <Loop className={styles.searchIcon} />
              </Form>
            </div>
          </Nav>
          <Nav>
            <div
              className={styles.favoritesDiv}
              onClick={() => navigate("/favorites")}
            >
              <Button className={styles.favorites}>
                <Heart className={styles.favoritesHeart} />
                Favourites
              </Button>
            </div>
            <Dropdown>
              <Dropdown.Toggle className={styles.profileTitle}>
                <Person
                  style={{ stroke: "$color-gray-600", marginRight: "7px" }}
                />
                My Profile
              </Dropdown.Toggle>

              <Dropdown.Menu className={styles.dropMenu}>
                <Dropdown.ItemText className={styles.hello}>
                  Hello!
                </Dropdown.ItemText>
                <Dropdown.Item
                  onClick={() => navigate("/my-account/profile")}
                  className={styles.profileOption}
                >
                  <Person className={styles.blueLogo} />
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/my-account/notifications")}
                  className={styles.profileOption}
                >
                  <Bell className={styles.blueLogo} />
                  Notifications
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/my-account/messages")}
                  className={styles.profileOption}
                >
                  <Chat className={styles.blueLogo} />
                  Messages
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/my-account/security")}
                  className={styles.profileOption}
                >
                  <Security className={styles.blueLogo} />
                  {"Login & security"}
                </Dropdown.Item>
                <Dropdown.Divider />

                <Dropdown.Item
                  onClick={logout}
                  className={styles.profileOption}
                >
                  <Logout className={styles.logout} />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
