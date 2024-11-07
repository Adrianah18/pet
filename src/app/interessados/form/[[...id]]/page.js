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
import MaskedInput from "react-text-mask";

export default function Page({ params }) {
  const route = useRouter();
  const interessados = JSON.parse(localStorage.getItem('interessados')) || [];
  const interessado = interessados.find(item => item.id == params.id) || { nome: '', email: '', telefone: '', endereco: '', preferencias: { especie: [], sexo: '' } };

  function salvar(dados) {
    if (interessado.id) {
      // Atualiza o item existente
      Object.assign(interessado, dados);
    } else {
      // Gera novo ID somente se não existir
      dados.id = v4();
      interessados.push(dados);
    }
    localStorage.setItem('interessados', JSON.stringify(interessados));
    route.push('/interessados');
  }

  const validationSchema = Yup.object({
    nome: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('Email inválido').required('E-mail é obrigatório'),
    telefone: Yup.string().required('Telefone é obrigatório'),
    endereco: Yup.string().optional(),
    preferencias: Yup.object({
      especie: Yup.array().min(1, 'Selecione pelo menos uma espécie'),
      sexo: Yup.string().oneOf(['feminino', 'masculino'], 'Sexo deve ser feminino ou masculino').required('Selecione o sexo preferido')
    }),
  });

  return (
    <Pagina>
      <div className="form-container">
        <h1>Cadastro de Pessoas Interessadas na Adoção</h1>
        <Formik
          initialValues={interessado}
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
                  placeholder="Nome Completo"
                  type="text"
                  name="nome"
                  value={values.nome}
                  onChange={handleChange}
                  isInvalid={touched.nome && !!errors.nome}
                />
                <div className="text-danger">{touched.nome && errors.nome}</div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>E-mail:</Form.Label>
                <MaskedInput
                  mask={false} // Desativa a máscara para permitir entrada livre
                  className="form-control"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="exemplo@dominio.com" // Sugestão de formato ao usuário
                  isInvalid={touched.email && !!errors.email}
                />
                <div className="text-danger">{touched.email && errors.email}</div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="telefone">
                <Form.Label>Telefone:</Form.Label>
                <MaskedInput
                  mask={[
                    '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/
                  ]} // Formato de máscara para (XX) XXXXX-XXXX
                  className={`form-control ${touched.telefone && errors.telefone ? 'is-invalid' : ''}`} // Adiciona classe is-invalid para exibir erro
                  name="telefone"
                  placeholder="(XX) XXXXX-XXXX"

                  value={values.telefone}
                  onChange={handleChange}
                />
                {touched.telefone && errors.telefone && (
                  <div className="invalid-feedback">{errors.telefone}</div> // Exibe a mensagem de erro abaixo
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="endereco">
                <Form.Label>Endereço (opcional):</Form.Label>
                <Form.Control
                  type="text"
                  name="endereco"
                  value={values.endereco}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Preferências:</Form.Label>
                <div style={{ display: "inline-flex", gap: "15px" }}>
                  <Form.Check
                    type="checkbox"
                    label="Cachorro"
                    name="preferencias.especie"
                    onChange={(e) => {
                      const especies = values.preferencias.especie.includes('cachorro')
                        ? values.preferencias.especie.filter(e => e !== 'cachorro')
                        : [...values.preferencias.especie, 'cachorro'];
                      handleChange({ target: { name: 'preferencias.especie', value: especies } });
                    }}
                    checked={values.preferencias.especie.includes('cachorro')}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Gato"
                    name="preferencias.especie"
                    onChange={(e) => {
                      const especies = values.preferencias.especie.includes('gato')
                        ? values.preferencias.especie.filter(e => e !== 'gato')
                        : [...values.preferencias.especie, 'gato'];
                      handleChange({ target: { name: 'preferencias.especie', value: especies } });
                    }}
                    checked={values.preferencias.especie.includes('gato')}
                  />
                </div>
                <div className="text-danger">
                  {touched.preferencias && errors.preferencias && errors.preferencias.especie}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <div style={{ display: "inline-flex", gap: "15px", marginTop: "10px" }}>
                  <Form.Check
                    type="radio"
                    label="Fêmea"
                    name="preferencias.sexo"
                    value="feminino"
                    onChange={handleChange}
                    checked={values.preferencias.sexo === 'feminino'}
                  />
                  <Form.Check
                    type="radio"
                    label="Macho"
                    name="preferencias.sexo"
                    value="masculino"
                    onChange={handleChange}
                    checked={values.preferencias.sexo === 'masculino'}
                  />
                </div>
              </Form.Group>


              <div className="button-group">
                <Button type="submit" variant="success">
                  <FaCheck /> Salvar
                </Button>
                <Link href="/interessados" className="btn btn-danger">
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
