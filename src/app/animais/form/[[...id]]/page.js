'use client'

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import * as Yup from 'yup'; // Importando Yup para validações
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import Footer from "@/app/components/Footer";
import { useEffect, useState } from "react";
import MaskedInput from 'react-text-mask'; // Importando react-text-mask


export default function Page({ params }) {
    const route = useRouter();

    // Lê dados do LocalStorage
    const animais = JSON.parse(localStorage.getItem('animais')) || [];
    const dados = animais.find(item => item.id == params.id);
    const animal = dados || { nome: '', idade: '', especie: '', abrigo: '', sexo: '', peso: '', status_adocao: '', imagem: '' };

    const [abrigos, setAbrigos] = useState([]);

    useEffect(() => {
        setAbrigos(JSON.parse(localStorage.getItem('abrigos')) || []);
    }, []);

    // Função para salvar dados
    function salvar(dados) {
        if (animal.id) {
            Object.assign(animal, dados);
        } else {
            dados.id = v4();
            animais.push(dados);
        }

        localStorage.setItem('animais', JSON.stringify(animais));
        route.push('/animais');
    }

    // Definindo o esquema de validação com Yup
    const validationSchema = Yup.object({
        nome: Yup.string().required('Nome é obrigatório'),
        idade: Yup.number().required('Idade é obrigatória').positive('A idade deve ser um número positivo').integer('A idade deve ser um número inteiro'),
        especie: Yup.string().required('Espécie é obrigatória'),
        abrigo: Yup.string().required('Abrigo é obrigatório'),
        sexo: Yup.string().required('Sexo é obrigatório'),
        peso: Yup.number().required('Peso é obrigatório').positive('O peso deve ser um número positivo'),
        status_adocao: Yup.string().required('Status é obrigatório'), // Mudança aqui para aceitar apenas um status
        imagem: Yup.string().url('A imagem deve ser uma URL válida').required('Imagem é obrigatória'),
    });

    return (
        <Pagina titulo="">
            <div className="form-container">
                <h1>Cadastro de Pets</h1>
                <Formik
                    initialValues={animal}
                    validationSchema={validationSchema}
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
                                <Form.Label>Nome:</Form.Label >
                                <Form.Control
                                
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange}
                                    isInvalid={touched.nome && !!errors.nome}
                                />
                                <div className="text-danger">{touched.nome && errors.nome}</div>
                            </Form.Group>

                            {/* Campo de idade com máscara numérica */}
                            <Form.Group className="mb-3" controlId="idade">
                                <Form.Label>Idade:</Form.Label>
                                <MaskedInput
                                    mask={[/\d/, /\d/]} // Limita a dois dígitos
                                    className="form-control"
                                    name="idade"
                                    value={values.idade}
                                    onChange={handleChange}
                                />
                                {touched.idade && errors.idade && <div className="text-danger">{errors.idade}</div>}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="especie">
                                <Form.Label>Espécie:</Form.Label>
                                <Form.Select
                                    name="especie"
                                    value={values.especie}
                                    onChange={handleChange}
                                    isInvalid={touched.especie && !!errors.especie}
                                    className="custom-select"
                                >
                                    <option value="">Selecione a Espécie</option>
                                    <option value="gato">Gato</option>
                                    <option value="cachorro">Cachorro</option>
                                </Form.Select>
                                <div className="text-danger">{touched.especie && errors.especie}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="abrigos">
                                <Form.Label>Abrigo:</Form.Label>
                                <Form.Select
                                    className="custom-select"
                                    name="abrigos"
                                    value={values.abrigos}
                                    onChange={handleChange}
                                    isInvalid={touched.abrigos && !!errors.abrigos}
                                >
                                    <option value=''>Selecione</option>
                                    {abrigos.map(item => (
                                        <option key={item.nome} value={item.nome}>
                                            {item.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <div className="text-danger">{touched.abrigos && errors.abrigos}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="sexo">
                                <Form.Label>Sexo:</Form.Label>
                                <Form.Select
                                    name="sexo"
                                    value={values.sexo}
                                    onChange={handleChange}
                                    isInvalid={touched.sexo && !!errors.sexo}
                                    className="custom-select"
                                >
                                    <option value="">Selecione o sexo</option>
                                    <option value="feminino">Feminino ♀</option>
                                    <option value="masculino">Masculino ♂</option>
                                </Form.Select>
                                <div className="text-danger">{touched.sexo && errors.sexo}</div>
                            </Form.Group>

                           {/* Campo de peso com máscara numérica */}
                           <Form.Group className="mb-3" controlId="peso">
                                <Form.Label>Peso (em kg):</Form.Label>
                                <MaskedInput
                                    mask={[/\d/, /\d/, '.', /\d/]} // Limita para dois dígitos antes do ponto e um após o ponto
                                    className="form-control"
                                    name="peso"
                                    value={values.peso}
                                    onChange={handleChange}
                                />
                                {touched.peso && errors.peso && <div className="text-danger">{errors.peso}</div>}
                            </Form.Group>

                            <Form.Group className="mb-3 form-group-status" controlId="status_adocao">
                                <Form.Label>Status de Adoção:</Form.Label>
                                <div className="form-check">
                                    <Form.Check
                                        type="radio"
                                        label="Adotado"
                                        name="status_adocao"
                                        value="adotado"
                                        checked={values.status_adocao === "adotado"}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-check">
                                    <Form.Check
                                        type="radio"
                                        label="Disponível"
                                        name="status_adocao"
                                        value="disponível"
                                        checked={values.status_adocao === "disponível"}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="text-danger">{touched.status_adocao && errors.status_adocao}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="imagem">
                                <Form.Label>Imagem:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="imagem"
                                    value={values.imagem}
                                    onChange={handleChange}
                                    isInvalid={touched.imagem && !!errors.imagem}
                                />
                                <div className="text-danger">{touched.imagem && errors.imagem}</div>
                            </Form.Group>

                            <div className="button-group">
                                <Button type="submit" variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/animais" className="btn btn-danger">
                                    <MdOutlineArrowBack /> Voltar
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
