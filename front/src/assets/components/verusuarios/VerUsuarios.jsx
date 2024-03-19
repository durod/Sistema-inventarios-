import { useEffect } from "react";

import { Table, Dropdown } from "react-bootstrap";

import AdminEquipos from "../adminequipos/AdminEquipos.jsx";
import "../verusuarios/estilosverusuario.css";
import { useEquiposContext } from "../../context/EquiposContext.jsx";

function verUsuarios() {
  const { verUsuarios, usuarios, eliminarUsuario, } =
    useEquiposContext();

  useEffect(() => {
    verUsuarios();
  }, [verUsuarios]);

  const renderUsuarios = () => {
    return usuarios.map((usuario, index) => (
      <tr key={`${usuarios.id}`}>
        <td className="text-center align-middle">{`${usuario.correo}`}</td>
        <td className="text-center align-middle">{`${usuario.password}`}</td>
        <td className="text-center align-middle">{`${usuario.rol}`}</td>

        <td>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Acciones
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item>
  <button
    className="btn btn-danger mx-auto"
    onClick={() => eliminarUsuario(usuario.id)} // Asumiendo que `id` es el identificador único de usuario
  >
    Eliminar
  </button>
</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    ));
  };

  return (
    <div className="containerveusuarios">
      <div className="cajaadminequiposverusuarios">
        <AdminEquipos />
      </div>
      <div className="cajaprincipalverusuarios">
        <Table striped bordered hover variant="dark" className="custom-table">
          <thead>
            <tr>
              <th className="text-center align-middle">Correo</th>
              <th className="text-center align-middle">Password </th>
              <th className="text-center align-middle">Rol</th>
              <th className="text-center align-middle">Acción</th>
            </tr>
          </thead>
          <tbody>{renderUsuarios()}</tbody>
        </Table>
      </div>
    </div>
  );
}

export default verUsuarios;
