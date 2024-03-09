import "../login/estilologinuser.css";

function LoginUser() {
  return (
    <div className="containerloginuser">
        
    <input id="signup_toggle" type="checkbox"/>
    <form className="formloginuser">
        <div className="form_front">
            <div className="form_details">Login</div>
            <input type="text" className="inputloginuser" placeholder="Username"/>
            <input type="text" className="inputloginuser" placeholder="Password"/>
            <button className="btn">Login</button>
            
        </div>
        <div className="form_back">
            <div className="form_details">SignUp</div>
            <input type="text" className="inputloginuser" placeholder="Firstname"/>
            <input type="text" className="inputloginuser" placeholder="Username"/>
            <input type="text" className="inputloginuser" placeholder="Password"/>
            <input type="text" className="inputloginuser" placeholder="Confirm Password"/>
            <button className="btnloginuser">Signup</button>
            
        </div>
    </form>
</div>

  )
}

export default LoginUser