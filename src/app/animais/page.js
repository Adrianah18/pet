// src/app/animais/page.js
'use client'
import Cabecalho from "@/components/Cabecallho";
import Pagina from "@/components/Pagina";
import Link from "next/link";
import { Table } from "react-bootstrap";

export default function Page() {
  return (
    <Pagina titulo="Clientes">
      <Cabecalho titulo="Clientes" subtitulo="Página de clientes usando o cabeçalho" />

      <Link href="/">Página Inicial</Link><br />

      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Pagina>
  );
}
