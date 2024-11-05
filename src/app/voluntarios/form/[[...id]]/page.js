'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import * as Yup from 'yup'; // Importando Yup para validações
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import Pagina from "@/app/components/Pagina";
import Footer from "@/app/components/Footer";

export default function Page({ params }) {
  const route = useRouter();
  const voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
  const voluntario = voluntarios.find(item => item.id == params.id) || { nome: '', especialidade: '', imagem: '' };

  function salvar(dados) {
    if (voluntario.id) {
      Object.assign(voluntario, dados);
    } else {
      dados.id = v4();
      voluntarios.push(dados);
    }
    localStorage.setItem('voluntarios', JSON.stringify(voluntarios));
    route.push('/voluntarios');
  }

  const validationSchema = Yup.object({
    nome: Yup.string().required('Nome é obrigatório'),
    especialidade: Yup.string().required('Especialidade é obrigatória'),
    imagem: Yup.string().url('URL da imagem inválida').required('Imagem é obrigatória'),
  });

  return (
    <Pagina>
      <div className="form-container">
        <h1>Cadastro de Voluntários</h1>
        <Formik
          initialValues={voluntario}
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
                <Form.Label>Nome Completo:</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={values.nome}
                  onChange={handleChange}
                  isInvalid={touched.nome && !!errors.nome}
                />
                <div className="text-danger">{touched.nome && errors.nome}</div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="especialidade">
                <Form.Label>Especialidade:</Form.Label>
                <Form.Control
                  type="text"
                  name="especialidade"
                  value={values.especialidade}
                  onChange={handleChange}
                  isInvalid={touched.especialidade && !!errors.especialidade}
                />
                <div className="text-danger">{touched.especialidade && errors.especialidade}</div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="imagem">
                <Form.Label>URL da Imagem:</Form.Label>
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
                <Link href="/voluntarios" className="btn btn-danger">
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
