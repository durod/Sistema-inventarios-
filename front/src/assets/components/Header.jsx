import React from 'react'
import "../components/styles/estiloheader.css";

function Header() {
  return (
    <header className="sticky-header">
      {/* Tu contenido del encabezado aquí */}
      <img
        src="https://intranet.eleconomista.com.mx/img/logoeconomista.svg"
        alt="Logo de El Economista"
      />
      
    </header>
  )
}

export default Header