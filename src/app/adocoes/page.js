'use client'

import Link from "next/link"
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina";
import Footer from "../components/Footer";

export default function Page() {
    const [adocoes, setAdocoes] = useState([])

    useEffect(() => {
        const dados = JSON.parse(localStorage.getItem('adocoes')) || [];
        setAdocoes(dados);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = adocoes.filter(item => item.id != id)
            localStorage.setItem('adocoes', JSON.stringify(dados))
            setAdocoes(dados)
        }
    }

    return (
        <Pagina className="page-title" titulo="">            
        <Link
            href="/adocoes/form"
            className="btn btn-primary mb-3"
        >
            <FaPlusCircle /> Novo
        </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Animais</th>
                        <th>Data da Adoção</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {adocoes.map((item, i) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/adocoes/form/${item.id}`}>
                                    <FaRegEdit title="Editar" className="voluntario-card-icon text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="voluntario-card-icon text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </td>
                            <td>{item.nome}</td> {/* Corrigido para 'nome' */}
                            <td>{item.animais}</td> {/* Corrigido para 'animais' */}
                            <td>{item.data_adocao}</td> {/* Corrigido para 'data_adocao' */}
                            <td>{item.status_adocao}</td> {/* Corrigido para 'status_adocao' */}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Footer />
        </Pagina>
    )
}
