// src/app/components/Pagina.js
'use client'
import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";
import Image from "next/image";

export default function Pagina({ titulo, children }) {
  return (
    <>
      <Navbar className="navbar" variant="dark" expand="lg">
        <Container>
          <Link href="/" passHref>
            <Navbar.Brand>
              <Image src="/imagens/logo.png" alt="Logo pet" width={250} height={250} className="logo" />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" legacyBehavior>
                <Nav.Link className="nav-link">Home</Nav.Link>
              </Link>
              <Link href="/sobre" legacyBehavior>
                <Nav.Link className="nav-link">Sobre</Nav.Link>
              </Link>
              <Link href="/contato" legacyBehavior>
                <Nav.Link className="nav-link">Contato</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <h1>{titulo}</h1>
        <div>{children}</div> {/* Isso agora renderiza o conteúdo passado */}
      </div>
    </>
  );
}
