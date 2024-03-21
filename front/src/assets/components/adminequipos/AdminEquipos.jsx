import { Link } from "react-router-dom";
import { useEquiposContext } from "../../context/EquiposContext.jsx"; // Asegúrate de importar el hook del contexto


function AdminEquipos() {
  const { usuarioActual } = useEquiposContext();
  return (
    <div className="cajaprincipaladminequipos">
      <div className="menuasideadminequipos">
        <div className="menuasideinterioradminequipos">
          <div className="input">
            <button className="value">
              <svg
                data-name="Layer 2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
              >
                <path
                  d="m1.5 13v1a.5.5 0 0 0 .3379.4731 18.9718 18.9718 0 0 0 6.1621 1.0269 18.9629 18.9629 0 0 0 6.1621-1.0269.5.5 0 0 0 .3379-.4731v-1a6.5083 6.5083 0 0 0 -4.461-6.1676 3.5 3.5 0 1 0 -4.078 0 6.5083 6.5083 0 0 0 -4.461 6.1676zm4-9a2.5 2.5 0 1 1 2.5 2.5 2.5026 2.5026 0 0 1 -2.5-2.5zm2.5 3.5a5.5066 5.5066 0 0 1 5.5 5.5v.6392a18.08 18.08 0 0 1 -11 0v-.6392a5.5066 5.5066 0 0 1 5.5-5.5z"
                  fill="#7D8590"
                ></path>
              </svg>
              Administrador
            </button>

            
            {/* Botón para "Agregar Equipo", condicionalmente visible */}
            {usuarioActual && usuarioActual.rol !== 'RH' && (
              <button className="value">
                {/* Icono y enlace para Agregar Equipo */}
                <Link to="/agregarequipo">Agregar Equipo</Link>
              </button>
            )}

            {/* Botón para "Ver Equipos", siempre visible */}
            <button className="value">
              {/* Icono y enlace para Ver Equipos */}
              <Link to="/verequipos">Ver Equipos</Link>
            </button>

            {/* Botón para "Buscar Equipos", siempre visible */}
            <button className="value">
              {/* Icono y enlace para Buscar Equipos */}
              <Link to="/buscarEquipo">Buscar Equipos</Link>
            </button>

            {/* Botón para "Agregar Usuario", condicionalmente visible */}
            {usuarioActual && usuarioActual.rol !== 'RH' && (
              <button className="value">
                {/* Icono y enlace para Agregar Usuario */}
                <Link to="/registrarusuario">Agregar Usuario</Link>
              </button>
            )}

            {/* Botón para "Ver Usuarios", condicionalmente visible */}
            {usuarioActual && usuarioActual.rol !== 'RH' && (
              <button className="value">
                {/* Icono y enlace para Ver Usuarios */}
                <Link to="/usuario">Ver Usuarios</Link>
              </button>
            )}

            {/* Botón para "Dashboard", condicionalmente visible */}
            {usuarioActual && usuarioActual.rol !== 'RH' && (
              <button className="value">
                {/* Icono y enlace para Dashboard */}
                <Link to="/dashboardequipos">Dashboard</Link>
              </button>
            )}

            {/* Botón para "Auditores", siempre visible */}
            <button className="value">
              {/* Icono y enlace para Vista de Auditores */}
              <Link to="/vistaauditor">Auditores</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminEquipos;