'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina";
import Footer from "../components/Footer";

export default function Page() {
  const [voluntarios, setVoluntarios] = useState([]);

  useEffect(() => {
    setVoluntarios(JSON.parse(localStorage.getItem('voluntarios')) || []);
  }, []);

  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) {
      const dados = voluntarios.filter(item => item.id !== id);
      localStorage.setItem('voluntarios', JSON.stringify(dados));
      setVoluntarios(dados);
    }
  }

  return (
    <Pagina className="page-title" titulo="Nossos Volutários">
      <Link href="/voluntarios/form" className="btn btn-primary mb-3">
        <FaPlusCircle /> Novo
      </Link>

      <div className="voluntario-card-container">
        {voluntarios.map((item) => (
          <div key={item.id} className="voluntario-card">
            <img src={item.imagem} alt={item.nome} className="voluntario-card-img" />
            <div className="voluntario-card-body">
              <h5 className="voluntario-card-title">{item.nome}</h5>
              <p className="voluntario-card-text">
                <strong>Especialidade:</strong> {item.especialidade} <br />
              </p>
              
              <div className="voluntario-card-actions">
                <Link href={`/voluntarios/form/${item.id}`}>
                  <FaRegEdit title="Editar" className="voluntario-card-icon text-primary" />
                </Link>
                <MdDelete
                  title="Excluir"
                  className="voluntario-card-icon text-danger"
                  onClick={() => excluir(item.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </Pagina>
  );
}
