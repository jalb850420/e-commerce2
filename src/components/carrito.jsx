import React from "react";
import styled from "styled-components";

const EstiloGeneral = styled.article`
  button.ico_car_menos img {
    max-width: 14px;
    max-height: 14px;
  }

  .carrito-titulo {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-texto);
    text-align: center;
    padding: 8px;
    background-color: #E3F2FD; /* Mismo tono suave que usaste en Card */
    border-radius: 12px;
    box-shadow: inset 0 -2px var(--color-dorado);
  }

 
/* * {
    border: 1px solid red;
} */

ul {
  padding-left: 0; /* Elimina el espacio izquierdo de la lista */
  margin-left: 0; /* Evita que los elementos se desplacen a la derecha */
  list-style-type: none; 
}

.carrito-item {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  flex-wrap: nowrap;
  background-color: #E3F2FD; /* Color de fondo suave */
  padding: 8px 10px;
  border-radius: 8px;
  margin-bottom: 2px; /* Espaciado más reducido entre elementos */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
}

.div_titulo_precio {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  width: 100%; 
}

.controles {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.botones {
  display: flex;
  align-items: center;
  gap: 5px;
}

p {
  margin: 0; /* Elimina márgenes predeterminados */
}

`;


export const Carrito = ({ carrito = [], eliminarDelCarrito, setCarrito }) => {
    const aumentarCantidad = (index) => {
        setCarrito(prev => {
            const nuevoCarrito = [...prev];
            nuevoCarrito[index].cantidad += 1;
            return nuevoCarrito;
        });
    };

    const reducirCantidad = (index) => {
        setCarrito(prev => {
            const nuevoCarrito = [...prev];
            if (nuevoCarrito[index].cantidad > 1) {
                nuevoCarrito[index].cantidad -= 1;
            }
            return nuevoCarrito;
        });
    };


    return (
        <EstiloGeneral>
            <h3 className="carrito-titulo">Carrito de Compras</h3>
            {carrito.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <ul>
                    {carrito.map((articulo, index) => (
                        <li className="carrito-item" key={index}>
                        <div className="div_titulo_precio">
                            <b>{articulo.nombre}</b>  {new Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP"
                            }).format(articulo.precio * articulo.cantidad)}
                        </div>
                        <div className="controles">
                            <p>Cantidad: {articulo.cantidad} | Talla: EUR {articulo.talla}</p>
                            <div className="botones">
                            <button onClick={() => reducirCantidad(index)} disabled={articulo.cantidad === 1}>➖</button>
                            <button onClick={() => aumentarCantidad(index)}>➕</button>
                            <button className="ico_car_menos" onClick={() => eliminarDelCarrito(index)}>
                                <img className="ico_car_menos" src="imagenes/iconos/carrito-menos.png"/>
                            </button>
                            </div>
                        </div>
                        </li>
                    ))}
                </ul>
            )}            
            <div>
                <h3>Total de la compra: {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP"
                }).format(carrito.reduce((total, articulo) => total + (articulo.precio * articulo.cantidad), 0))}</h3>
            </div>
        </EstiloGeneral>  
    );
};

export default Carrito;

                    //  ❌ 