'use client'

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import * as Yup from 'yup';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import Footer from "@/app/components/Footer";
import MaskedInput from "react-text-mask";

export default function Page({ params }) {
    const route = useRouter();

    const abrigos = JSON.parse(localStorage.getItem('abrigos')) || [];
    const dados = abrigos.find(item => item.id == params.id);
    const abrigo = dados || { nome: '', endereco: '', cep: '', telefone: '', capacidade: '', site: '', imagem: '' };

    function salvar(dados) {
        if (abrigo.id) {
            Object.assign(abrigo, dados);
        } else {
            dados.id = v4();
            abrigos.push(dados);
        }

        localStorage.setItem('abrigos', JSON.stringify(abrigos));
        route.push('/abrigos');
    }

    const validationSchema = Yup.object({
        nome: Yup.string().required('Nome é obrigatório'),
        endereco: Yup.string().required('Endereço é obrigatório'),
        cep: Yup.string().required('CEP é obrigatório').matches(/^\d{5}-\d{3}$/, 'CEP inválido (formato XXXXX-XXX)'),
        telefone: Yup.string().required('Telefone é obrigatório').matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido (formato (XX) XXXXX-XXXX)'),
        capacidade: Yup.number().required('Capacidade é obrigatória').positive('A capacidade deve ser um número positivo').integer('A capacidade deve ser um número inteiro'),
        site: Yup.string().url('O site deve ser uma URL válida'),
        imagem: Yup.mixed().required('Uma imagem é obrigatória')
    });

    return (
        <Pagina titulo="Cadastro de Abrigos">
            <div className="form-container">
                <h1>Cadastro de Abrigos</h1>
                <Formik
                    initialValues={abrigo}
                    validationSchema={validationSchema}
                    onSubmit={values => salvar(values)}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        errors,
                        touched,
                        setFieldValue,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange}
                                    className={touched.nome && errors.nome ? 'is-invalid' : ''}
                                />
                                <div className="text-danger">{touched.nome && errors.nome}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="endereco">
                                <Form.Label>Endereço:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="endereco"
                                    value={values.endereco}
                                    onChange={handleChange}
                                    className={touched.endereco && errors.endereco ? 'is-invalid' : ''}
                                />
                                <div className="text-danger">{touched.endereco && errors.endereco}</div>
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="cep">
                                <Form.Label>CEP:</Form.Label>
                                <MaskedInput
                                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                                    className={`form-control ${touched.cep && errors.cep ? 'is-invalid' : ''}`}
                                    value={values.cep}
                                    onChange={handleChange}
                                    name="cep"
                                />
                                <div className="text-danger">{touched.cep && errors.cep}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="telefone">
                                <Form.Label>Telefone:</Form.Label>
                                <MaskedInput
                                    mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    className={`form-control ${touched.telefone && errors.telefone ? 'is-invalid' : ''}`}
                                    value={values.telefone}
                                    onChange={handleChange}
                                    name="telefone"
                                />
                                <div className="text-danger">{touched.telefone && errors.telefone}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="capacidade">
                                <Form.Label>Capacidade:</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="capacidade"
                                    value={values.capacidade}
                                    onChange={handleChange}
                                    className={touched.capacidade && errors.capacidade ? 'is-invalid' : ''}
                                />
                                <div className="text-danger">{touched.capacidade && errors.capacidade}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="imagem">
                                <Form.Label>Imagem do Abrigo:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="imagem"
                                    value={values.imagem}
                                    onChange={handleChange}
                                    className={touched.imagem && errors.imagem ? 'is-invalid' : ''}
                                />
                                <div className="text-danger">{touched.imagem && errors.imagem}</div>
                            </Form.Group>

                            <div className="button-group">
                                <Button type="submit" variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/abrigos" className="btn btn-danger">
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
