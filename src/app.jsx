import React, { useEffect, useState } from "react";
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

  const [productos, setProductos] = useState([]);

//   useEffect(() => {
//     const getProductos = async () => {
//     try {
//       // const response = await fetch("https://dummyjson.com/products?limit=40", {
//       const response = await fetch("https://dummyjson.com/products/category/mens-shoes?limit=40", {method: "GET", });
//       const data = await response.json();
//       console.log(data.products); // Solo para depurar
//       setProductos(data.products); // Guardamos los productos
//     } catch (error) {
//       console.error("Error al cargar productos:", error);
//     }
//   };
//   getProductos();
// }, []);

  useEffect(() => {
    const getProductos = async () => {
    try {
      const respHombre  = await fetch("https://dummyjson.com/products/category/mens-shoes?limit=40", {method: "GET", });
      const respMujer  = await fetch("https://dummyjson.com/products/category/womens-shoes?limit=40", {method: "GET", });

      const dataHombre = await respHombre.json();
      const dataMujer = await respMujer.json();
      
      const todosLosZapatos = [...dataHombre.products, ...dataMujer.products];
      setProductos(todosLosZapatos);
      console.log(todosLosZapatos); 
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };
  getProductos();
}, []);

  return (
    <Contenedor_general>
      <Header carrito={carrito} mostrarCarrito={mostrarCarrito} setMostrarCarrito={setMostrarCarrito}/>
      <div className="Contenedor1">
        <div className="ProductosContainer">
          {productos.map((producto, index)=> (
            <Card 
              key={index}
              className="Card"
              imagen={producto.images[0]}
              titulo={producto.title}
              precio={producto.price}
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
