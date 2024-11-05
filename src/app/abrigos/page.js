'use client'

import Link from "next/link"
import { useEffect, useState } from "react";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import Pagina from "../components/Pagina";
import { MdDelete } from "react-icons/md";
import Footer from "../components/Footer";

export default function Page() {

    const [abrigos, setAbrigos] = useState([]);
    const [abrigosProximos, setAbrigosProximos] = useState([]);
    const [cepBusca, setCepBusca] = useState("");

    useEffect(() => {
        setAbrigos(JSON.parse(localStorage.getItem('abrigos')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = abrigos.filter(item => item.id !== id);
            localStorage.setItem('abrigos', JSON.stringify(dados));
            setAbrigos(dados);
        }
    }

    function buscarAbrigos() {
        if (cepBusca.length !== 9) {
            alert('Por favor, insira um CEP válido (XXXXX-XXX).');
            return;
        }

        // Filtro de proximidade baseado no início do CEP
        const abrigosFiltrados = abrigos.filter(abrigo => abrigo.cep && abrigo.cep.startsWith(cepBusca.slice(0, 5)));

        setAbrigosProximos(abrigosFiltrados);
    }

    return (
        <Pagina titulo={<h1 className="page-title">Nossos Abrigos</h1>} >

            <Link href="/abrigos/form" className="btn btn-primary mb-3">
                <FaPlusCircle /> Novo
            </Link>

            {/* Campo de busca por CEP */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Digite seu CEP (XXXXX-XXX)"
                    className="form-control search-input"
                    maxLength={9}
                    value={cepBusca}
                    onChange={(e) => setCepBusca(e.target.value)}
                />
                <button onClick={buscarAbrigos} className="btn btn-info search-button">
                    Achar abrigos próximo a você
                </button>
            </div>
            {/* Exibição dos abrigos */}
            <div className="shelter-card-container">
                {abrigosProximos.length > 0 ? (
                    abrigosProximos.map((abrigo, index) => (
                        <div key={index} className="shelter-card">
                            <img src={abrigo.imagem} alt={abrigo.nome} className="shelter-card-img" /> {/* Adicione a imagem se necessário */}
                            <div className="shelter-card-body">
                                <h5 className="shelter-card-title">{abrigo.nome}</h5>
                                <p className="shelter-card-text">Endereço: {abrigo.endereco}</p>
                                <p className="shelter-card-text">Telefone: {abrigo.telefone}</p>
                                <div className="shelter-card-actions">
                                    <Link href={`/abrigos/form/${abrigo.id}`} className="btn btn-warning mx-1">Editar</Link>
                                    <button onClick={() => excluir(abrigo.id)} className="btn btn-danger mx-1">Excluir</button>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(abrigo.endereco)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shelter-card-location-btn mx-1">
                                        Ver localização
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    abrigos.map((abrigo, index) => (
                        <div key={index} className="shelter-card">
                            <img src={abrigo.imagem} alt={abrigo.nome} className="shelter-card-img" /> {/* Adicione a imagem se necessário */}
                            <div className="shelter-card-body">
                                <h5 className="shelter-card-title">{abrigo.nome}</h5>
                                <p className="shelter-card-text">Endereço: {abrigo.endereco}</p>
                                <p className="shelter-card-text">Telefone: {abrigo.telefone}</p>
                                <div className="shelter-card-actions">
                                    <Link href={`/abrigos/form/${abrigo.id}`} className="btn btn-warning mx-1">
                                        <FaRegEdit title="Editar" className="text-primary" />
                                    </Link>
                                    <MdDelete
                                        title="Excluir"
                                        className="text-danger mx-1"
                                        onClick={() => excluir(abrigo.id)}
                                        style={{ cursor: 'pointer', fontSize: '1.5rem' }} // Adicione um tamanho e cursor apropriados
                                    />
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(abrigo.endereco)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shelter-card-location-btn mx-1">
                                        Ver localização
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </Pagina>
    );
}
