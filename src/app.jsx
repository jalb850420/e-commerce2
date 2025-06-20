import React, { useState } from "react";
import { Header } from "./components/header";
import { Card } from "./components/card";
import { Carrito } from "./components/carrito";
import styled from "styled-components";
import "./global.css"; 
import { productos } from "./productos";



const Contenedor_general = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: 4px;

  .Contenedor1 {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    border: 1px solid grey;
  }

  .ProductosContainer {
    display: flex;
    flex-wrap: wrap; /* Permite que los productos se distribuyan en filas */
    gap: 10px;
    width: 70%;
  }

  .Card {
    width: 50%; /* Para que entren dos por fila */
  }

  .Card img {
    width: 200px; /* Ajusta todas al mismo ancho */
    height: 200px; /* Todas del mismo alto */
    object-fit: cover; /* Evita deformaciones */
  }

  .Card:last-child {
    width: 100%; /* Última imagen ocupa toda la tercera fila */
  }

  .Carrito {
    right: 0px;
    width: 30%;
    border: 1px solid grey;
  }
`;



const App = () => {
  const [carrito, setCarrito] = useState([]); 
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const eliminarDelCarrito = (index) => {
      setCarrito(prev => prev.filter((_, i) => i !== index));
  };
  return (
    <Contenedor_general>
      <Header carrito={carrito} mostrarCarrito={mostrarCarrito} setMostrarCarrito={setMostrarCarrito}/>
      <div className="Contenedor1">
        <div className="ProductosContainer">
          {productos.map((producto, index)=> (
            <Card 
              key={index}
              className="Card"
              imagen={producto.imagen}
              titulo={producto.titulo}
              precio={producto.precio}
              setCarrito={setCarrito}
            />
          ))}
          {/* ========================                                                     */}
        </div>
        {mostrarCarrito && (
          <div className="Carrito">
            <Carrito carrito={carrito} setCarrito={setCarrito} eliminarDelCarrito={eliminarDelCarrito} />
          </div>
        )}
      </div>
    </Contenedor_general>
  );
};

export default App;
