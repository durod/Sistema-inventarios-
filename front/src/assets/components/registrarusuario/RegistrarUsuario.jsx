
import "../registrarusuario/registrarusuario.css";


import AdminEquipos from "../adminequipos/AdminEquipos";
function RegistrarUsuario() {
  // Aquí deberías agregar los useState para manejar los estados de los inputs

  return (
    <div className="containerregistrarusuario">
         <div className="cajaadminequipos">
              <AdminEquipos />
            </div>
    <form className="form" >
      <p className="title">Registrar un usuario</p>
      <p className="message">registra un usuario para que acceda al sistema</p>
      <div className="flex">
       
      </div>
      <label>
        <input className="input" type="text" placeholder="username" required   />
        <span>Username</span>
      </label>
      <label>
        <input className="input" type="password" placeholder="Password" required   />
        <span>Password</span>
      </label>
      <label>
        <input className="input" type="password" placeholder="Confirm password" required   />
        <span>Confirm password</span>
      </label>
      <label>
          <select className="input" required>
            <option value="" disabled selected>Seleccione un rol</option>
            <option value="Administrador">Administrador</option>
            <option value="RH">RH</option>
            <option value="auditor">Auditor</option>
          </select>
          <span>Rol</span>
        </label>
      <button className="submit" type="submit">Submit</button>
      
    </form>
    </div>
  );
}

export default RegistrarUsuario;
