import "../registrarusuario/registrarusuario.css";

import AdminEquipos from "../adminequipos/AdminEquipos.jsx";
import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_URL;

function RegistrarUsuario() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const correo = event.target.elements.labelusername.value;
    const password = event.target.elements.labelpassword.value;
    const rol = event.target.elements.labelrol.value;
    const confirmPassword = event.target.elements.confirmPassword.value; // Asegúrate de asignar el id="confirmPassword" al input correspondiente

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Verificar que al menos un campo esté lleno
    if (!(correo && password && rol)) {
      alert("Debes llenar los campos.");
      return;
    }

    // Crear un objeto con los datos del equipo
    const usuarioData = {
      correo: correo,
      password: password,
      rol: rol,
    };

    try {
      // Enviar la solicitud solo si al menos un campo está lleno
      await axios.post(`${backendURL}/usuario`, usuarioData);

      // Limpiar el formulario después de agregar el equipo
      event.target.reset();

      // Mostrar el mensaje de éxito
      alert("El usuario se ha agregado correctamente.");

      // Redirigir a la página de inicio después de agregar el equipo
      window.location.href = "/";
    } catch (error) {
      console.error("Error al agregar equipo:", error.message);
    }
  };

  return (
    <div className="containerregistrarusuario">
      <div className="cajaadminequiposregistrarusuario">
        <AdminEquipos />
      </div>
      <div className="cajaregistrarusuario">
        <form onSubmit={handleSubmit} className="formregistrarusuario">
          <p className="title">Registrar un usuario</p>
          <p className="message">
            registra un usuario para que acceda al sistema
          </p>
          <div className="flex"></div>
          <label>
            <input
              id="labelusername"
              className="inputregistrarusuario"
              type="text"
              required
            />
            <span>Username</span>
          </label>
          <label>
            <input
              id="labelpassword"
              className="inputregistrarusuario"
              type="password"
              required
            />
            <span>Password</span>
          </label>
          <label>
            <input
              id="confirmPassword"
              className="inputregistrarusuario"
              type="password"
              required
            />
            <span>Confirm password</span>
          </label>
          <label>
            <select id="labelrol" className="inputregistrarusuario" required>
              <option value="" disabled selected>
                Seleccione un rol
              </option>
              <option value="Administrador">Administrador</option>
              <option value="RH">RH</option>
              <option value="auditor">Auditor</option>
            </select>
            <span>Rol</span>
          </label>
          <button className="submitregistrarusuario" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrarUsuario;
