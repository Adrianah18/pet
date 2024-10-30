// src/componentes/pagina.js
'use client'
import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Pagina(props) {
  return (
    <>
      <Navbar className="navbar" variant="dark" expand="lg">
        <Container>
          <Link href="/" passHref>
            <Navbar.Brand>Minha Marca</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/sobre" passHref>
                <Nav.Link>Sobre</Nav.Link>
              </Link>
              <Link href="/contato" passHref>
                <Nav.Link>Contato</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
