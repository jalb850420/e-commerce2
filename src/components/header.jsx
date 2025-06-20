import React from "react";
import styled from "styled-components";

const Contenedor_general = styled.article`
    width: 100%;
  /* *{
    border: 1px solid red;
  } */

  background-color: #E3F2FD; 
  
  .Header {
    display: flex;
    justify-content: space-between;
    align-items:center;
    gap: 10px;
    border: 1px solid grey;
    width: 96.8%;
    padding: 20px;
  }

  .car-header {
    /* position: absolute; */
    display: flex;
    justify-content:flex;
    align-items:center;
    right: 10px;
    height:100%;
  }

  .car-header img{
    background-image: url("imagenes/iconos/carrito-de-compras_Negro.png");
    width: 40px;
    height: 40px;  
    background-size: cover;
  }

  .car-header img:hover {
    background-image: url("imagenes/iconos/carrito-de-compras_Azul.png");
    width: 40px;
    height: 40px;  
    background-size: cover;
    transform: scale(1.05);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  }

`;

export const Header = ({ carrito = [],mostrarCarrito, setMostrarCarrito }) => {
    // const mostrarCarrito = () => {
    //     alert("sirvio");
    // };
    return  (       
        <Contenedor_general>
            <header className="Header">
              <h1>
                My first E-commerce
              </h1>
              <div className="car-header" onClick={() => setMostrarCarrito(!mostrarCarrito)}>
                <img/>
                <span>
                  ({carrito.reduce((acumulador, articulo) => acumulador + articulo.cantidad, 0)})
                </span>
              </div>
            </header>
        </Contenedor_general>
)}

export default Header;