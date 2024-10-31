// src/componentes/Pagina.js
'use client'
import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";
import Image from "next/image";

export default function Pagina(props) {
  return (
    <>
      <Navbar className="navbar" variant="dark" expand="lg">
        <Container>
          {/* Logo com estilização global */}
          <Link href="/" passHref>
            <Navbar.Brand className="navbar-brand d-flex align-items-center">
              <Image src="/imagens/logo.png" alt="Logo pet" width={50} height={50} className="logo" />
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref>
                <Nav.Link className="nav-link">Home</Nav.Link>
              </Link>
              <Link href="/sobre" passHref>
                <Nav.Link className="nav-link">Sobre</Nav.Link>
              </Link>
              <Link href="/contato" passHref>
                <Nav.Link className="nav-link">Contato</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
