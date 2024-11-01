// src/app/home/page.js
'use client';
import Link from "next/link";
import { Card, Image, Container, Row, Col } from "react-bootstrap";
import Pagina from "../components/Pagina";


export default function Page() {
    return (
        <Pagina titulo="">
            {/* Banner */}
            <Image class="banner"
                src="/imagens/banner.png" // Coloque o caminho da sua imagem aqui
                alt="Banner de adoção de pets"
                fluid
                style={{ width: '90%', height: '400px'}} // Estilização para o banner ocupar 100% da largura
            />

            {/* Texto "Por que adotar?" */}
            <h2 className="mt-4 text-center">Por que adotar?</h2>

            {/* Container para os cards */}
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md={4}>
                        <Card>
                            <Card.Img variant="top" src="/imagens/card1.png" />
                            <Card.Body>
                                <Card.Title>Nesse exato momento,</Card.Title>
                                <Card.Text>
                                    existem milhares de doguinhos e gatinhos esperando um humano para chamar de seu..
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Img variant="top" src="/imagens/card2.png" />
                            <Card.Body>
                                <Card.Title>E não há recompensa maior</Card.Title>
                                <Card.Text>
                                    do que vê-los se tornando aquela coisinha alegre e saudável depois de uma boa dose de cuidado e carinho.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Img variant="top" src="/imagens/card3.png" />
                            <Card.Body>
                                <Card.Title>Pensando bem, a pergunta é outra:</Card.Title>
                                <Card.Text>
                                    se você pode mudar o destino de um animal de rua, por que não faria isso?
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Pagina>
    );
}
