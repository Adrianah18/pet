'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina";
import Footer from "../components/Footer";

export default function Page() {
  const [interessados, setInteressados] = useState([]);

  useEffect(() => {
    setInteressados(JSON.parse(localStorage.getItem('interessados')) || []);
  }, []);

  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) {
      const dados = interessados.filter(item => item.id !== id);
      localStorage.setItem('interessados', JSON.stringify(dados));
      setInteressados(dados);
    }
  }

  return (
    <Pagina titulo={<h1 className="page-title">Pessoas Interessadas na Adoção</h1>} >

      <Link href="/interessados/form" className="btn btn-primary mb-3">
        <FaPlusCircle /> Novo
      </Link>

      <div className="interessado-card-container">
        {interessados.map((item) => (
          <div key={item.id} className="interessado-card">
            <h5 className="interessado-card-title">{item.nome}</h5>
            <p className="interessado-card-text">
              <strong>E-mail:</strong> {item.email} <br />
              <strong>Telefone:</strong> {item.telefone} <br />
              <strong>Endereço:</strong> {item.endereco} <br />
              <strong>Espécies Preferidas:</strong> {item.preferencias.especie.join(', ')} <br />
              <strong>Sexo Preferido:</strong> {item.preferencias.sexo}
            </p>
            <div className="interessado-card-actions">
              <Link href={`/interessados/form/${item.id}`}>
                <FaRegEdit title="Editar" className="interessado-card-icon text-primary" />
              </Link>
              <MdDelete
                title="Excluir"
                className="interessado-card-icon text-danger"
                onClick={() => excluir(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </Pagina>
  );
}
