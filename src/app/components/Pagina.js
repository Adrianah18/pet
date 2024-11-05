'use client'
import Image from "next/image";
import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Pagina(props) {
    return (
        <>
            <Navbar className="navbar" variant="dark" expand="lg">
                <Container>
                    <Link href="/home" passHref>
                        <Navbar.Brand>
                            <Image src="/imagens/logo.png" alt="Logo pet" width={500} height={500} className="logo" />
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="nav-link" href="/home">Home</Nav.Link>
                    </Nav>

                    <Nav className="me-auto">
                        <Nav.Link className="nav-link" href="/animais">Adote</Nav.Link>
                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link className="nav-link" href="/voluntarios">Voluntarios</Nav.Link>
                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link className="nav-link" href="/abrigos">Abrigos</Nav.Link>
                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link className="nav-link" href="/adocoes">Adocoes</Nav.Link>
                    </Nav>
                    
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="bg-secondary text-white text-center p-3">
                <h1>{props.titulo}</h1>
            </div>
            <Container>
                {props.children}
            </Container>
        </>

    )
}