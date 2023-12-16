/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <Navbar className="nav-bar-border" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container className="nav-cont">
        <Link passHref href="/">
          <Navbar.Brand className="nav-header">Rare Publishing</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link className="nav-lnk">Home</Nav.Link>
            </Link>
            <Link passHref href="/categories">
              <Nav.Link className="nav-lnk">Categories</Nav.Link>
            </Link>
            {/* <Link passHref href="/users/">
              <Nav.Link className="nav-lnk">Users</Nav.Link>
            </Link> */}
            <Link passHref href="/users">
              <Nav.Link className="nav-lnk">Profile</Nav.Link>
            </Link>
            <SearchBar className="me-3" />
            <Button className="nav-btn" variant="light" onClick={signOut}>
              sign out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
