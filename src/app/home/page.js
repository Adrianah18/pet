// src/app/home/page.js
'use client';
import { Card, Image, Container, Row, Col } from "react-bootstrap";
import Pagina from "../components/Pagina";
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";

// Componente para o processo de adoção
const AdoptionProcess = () => {
  const steps = [
    {
      icon: "🐾", // Substitua por um ícone SVG ou imagem real
      title: "Ache seu pet",
      description: "Visite uma loja Petz que tenha espaço dedicado à adoção. Lá você irá conhecer os pets das ONGs/protetores parceiros para criar a conexão perfeita com cão e/ou gato que busca um novo lar. Confira a lista de lojas aqui."
    },
    {
      icon: "📋", // Substitua por um ícone SVG ou imagem real
      title: "Formulário de Interesse",
      description: "Faça a entrevista na hora nas lojas com um voluntário da ONG/protetor. Caso não haja um voluntário presente, não tem problema, basta preencher o formulário de interesse que os disponibilizamos aqui que a ONG/protetor entrará em contato com você em até 48h."
    },
    {
      icon: "✅", // Substitua por um ícone SVG ou imagem real
      title: "Avaliação da adoção",
      description: "A ONG/protetor parceiro irá fazer a análise do cadastro e perfil do adotante vs pet escolhido. Preenchendo os requisitos, você recebe a aprovação na hora."
    },
    {
      icon: "🏡", // Substitua por um ícone SVG ou imagem real
      title: "Adoção Completa",
      description: "Caso seja aprovado na hora pelo voluntário da ONG/protetor, você já pode levar seu pet para casa! Se enviou o formulário online, espere o contato e a aprovação."
    }
  ];

  return (
    <Container className="adoption-process-container my-5">
      <h2 className="text-center mb-4">Quer fazer parte dessa corrente do bem e adotar? Entenda como funciona:</h2>
      <div className="adoption-process-steps d-flex justify-content-between">
        {steps.map((step, index) => (
          <div key={index} className="adoption-step text-center">
            <div className="icon" style={{ fontSize: "50px", color: "#FF6B6B" }}>{step.icon}</div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default function Page() {
  return (
    <Pagina titulo="">
      {/* Banner */}
      <Image className="banner"
        src="/imagens/banner.png" // Coloque o caminho da sua imagem aqui
        alt="Banner de adoção de pets"
        fluid
        style={{ width: '100%', height: '500px' }} // Estilização para o banner ocupar 100% da largura
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
                  existem milhares de doguinhos e gatinhos esperando um humano para chamar de seu.
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
      <AdoptionProcess />
      <footer className="text-center bg-body-tertiary">
        {/* Container para redes sociais */}
        <div className="container pt-4">
          <section className="mb-4">
            {/* Facebook */}
            <a
              className="btn btn-link btn-floating btn-lg text-body m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <FaFacebookF />
            </a>

            {/* Twitter */}
            <a
              className="btn btn-link btn-floating btn-lg text-body m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <FaTwitter />
            </a>

            {/* Google */}
            <a
              className="btn btn-link btn-floating btn-lg text-body m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <FaGoogle />
            </a>

            {/* Instagram */}
            <a
              className="btn btn-link btn-floating btn-lg text-body m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <FaInstagram />
            </a>

            {/* LinkedIn */}
            <a
              className="btn btn-link btn-floating btn-lg text-body m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <FaLinkedinIn />
            </a>

            {/* GitHub */}
            <a
              className="btn btn-link btn-floating btn-lg text-body m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <FaGithub />
            </a>
          </section>
        </div>

        {/* Copyright */}
        <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
          © 2024 Copyright:
          <a className="text-body" href="https://mdbootstrap.com/"> MDBootstrap.com</a>
        </div>
      </footer>
    </Pagina>
  );
}
