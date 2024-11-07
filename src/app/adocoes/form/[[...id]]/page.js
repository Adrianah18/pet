'use client'

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import * as Yup from 'yup'; // Importando Yup para validações
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import AdocoesValidator from "@/validators/AdocoesValidator";
import Footer from "@/app/components/Footer";

export default function Page({ params }) {
    const route = useRouter();

    const adocoes = JSON.parse(localStorage.getItem('adocoes')) || [];
    const dados = adocoes.find(item => item.id == params.id);
    const adocao = dados || { nome: '', animais: '', data_adocao: '', status_adocao: 'pendente' };

    const [interessados, setInteressados] = useState([]);
    const [animais, setAnimais] = useState([]);

    useEffect(() => {
        setInteressados(JSON.parse(localStorage.getItem('interessados')) || []);
        setAnimais(JSON.parse(localStorage.getItem('animais')) || []);
    }, []);

    
    function salvar(dados) {
        if (adocao.id) {
          Object.assign(adocao, dados);
        } else {
          dados.id = v4();
          adocoes.push(dados);
        }
        localStorage.setItem('adocoes', JSON.stringify(adocoes));
        route.push('/adocoes');
      }
    

    
    
    return (
        <Pagina titulo="">
            <div className="form-container">
                <h1>Cadastro de Adoções</h1>
                <Formik
                    initialValues={adocao}
                    validationSchema={AdocoesValidator}
                    onSubmit={values => salvar(values)}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        errors,
                        touched,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome:</Form.Label>
                                <Form.Select
                                    className="custom-select"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange}
                                    isInvalid={touched.nome && !!errors.nome}
                                >
                                    <option value=''>Selecione</option>
                                    {interessados.map(item => (
                                        <option key={item.nome} value={item.nome}>
                                            {item.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <div className="text-danger">{touched.nome && errors.nome}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="animais">
                                <Form.Label>Pet:</Form.Label>
                                <Form.Select
                                    className="custom-select"
                                    name="animais"
                                    value={values.animais}
                                    onChange={handleChange}
                                    isInvalid={touched.animais && !!errors.animais}
                                >
                                    <option value=''>Selecione</option>
                                    {animais.map(item => (
                                        <option key={item.nome} value={item.nome}>
                                            {item.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <div className="text-danger">{touched.animais && errors.animais}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="status_adocao">
                                <Form.Label>Status da Adoção:</Form.Label>
                                <div className="d-flex flex-column">
                                    {['pendente', 'em andamento', 'concluída'].map(status => (
                                        <Form.Check
                                            key={status}
                                            type="radio"
                                            label={status.charAt(0).toUpperCase() + status.slice(1)}
                                            name="status_adocao"
                                            value={status}
                                            checked={values.status_adocao === status}
                                            onChange={handleChange}
                                            isInvalid={touched.status_adocao && !!errors.status_adocao}
                                        />
                                    ))}
                                </div>
                                <div className="text-danger">{touched.status_adocao && errors.status_adocao}</div>
                            </Form.Group>

                            {/* Campo Data da Adoção visível apenas quando o status é "concluída" */}
                            {values.status_adocao === 'concluída' && (
                                <Form.Group className="mb-3" controlId="data_adocao">
                                    <Form.Label>Data da Adoção:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="data_adocao"
                                        value={values.data_adocao ? values.data_adocao.split('T')[0] : ''}
                                        onChange={handleChange}
                                        isInvalid={touched.data_adocao && !!errors.data_adocao}
                                    />
                                    <div className="text-danger">{touched.data_adocao && errors.data_adocao}</div>
                                </Form.Group>
                            )}


                            <div className="button-group">
                                <Button type="submit" variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/adocoes" className="btn btn-danger">
                                    Voltar
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <Footer />
        </Pagina>
    );
}
