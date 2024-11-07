'use client'

import Link from "next/link"
import { useEffect, useState } from "react";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina";
import Footer from "../components/Footer";

export default function Page() {

  const [animais, setAnimais] = useState([])

  useEffect(() => {
    setAnimais(JSON.parse(localStorage.getItem('animais')) || [])
  }, []);

  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) {
      const dados = animais.filter(item => item.id !== id)
      localStorage.setItem('animais', JSON.stringify(dados))
      setAnimais(dados)
    }
  }

  return (
    <Pagina className="page-title" titulo="">
      <Link href="/animais/form" className="btn btn-primary mb-3">
        <FaPlusCircle /> Novo
      </Link>
      <Link href="/interessados/form" className="search-button mb-3" style={{ marginLeft: '15px' }}>
        <FaPlusCircle /> tenho interesse em adotar
      </Link>

      <div className="animal-card-container">
        {animais.map((item, i) => (
          <div key={item.id} className="animal-card">
            <img src={item.imagem} alt={item.nome} className="animal-card-img" />
            <div className="animal-card-body">
              <h5 className="animal-card-title">{item.nome}</h5>
              <p className="animal-card-text">
                <strong>Idade:</strong> {item.idade} <br />
                <strong>Abrigo:</strong> {item.abrigo} <br />
                <strong>Espécie:</strong> {item.especie} <br />
                <strong>Sexo:</strong> {item.sexo} <br />
                <strong>Peso:</strong> {item.peso} kg <br />
                <strong>Status de Adoção:</strong> {item.status_adocao}
              </p>
              <div className="animal-card-actions">
                <Link href={`/animais/form/${item.id}`}>
                  <FaRegEdit title="Editar" className="animal-card-icon text-primary" />
                </Link>
                <MdDelete
                  title="Excluir"
                  className="animal-card-icon text-danger"
                  onClick={() => excluir(item.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </Pagina>
  )
}
