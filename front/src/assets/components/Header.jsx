import React from 'react'
import "../components/styles/estiloheader.css";

function Header() {
  return (
    <header className="sticky-header">
      
 <a href="/">
        <img
          src="https://intranet.eleconomista.com.mx/img/logoeconomista.svg"
          alt="Logo de El Economista"
        />
      </a>
      
    </header>
  )
}

export default Header