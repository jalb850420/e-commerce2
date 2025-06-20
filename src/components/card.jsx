import React, { useState } from "react";
import styled from "styled-components";


const Contenedor_general = styled.article`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-dorado);
  border-radius: 10px;
  padding: 15px;
  background-color: white;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  }

  .div_img {
    display: flex;
    justify-content: center;
    align-items: center;
  }

.titulo {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-texto);
  text-align: center;
  margin-bottom: 5px;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--color-dorado);
  background-color: #E3F2FD;
  border-radius: 12px;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  
  padding: 8px 12px; /* Más espacio interno */
  line-height: 1.5; /* Ajusta la altura de la línea para evitar que el texto se corte */
}



  img {
    height: 250px;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .div_eleccion {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .div_control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    gap: 5px
  }

  button {
    background-color: var(--color-acento);
    color: white;
    border: none;
    height: 30px; /* Igual que el input */
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: var(--color-hover);
    }
  }

  .input {
    width: 40px;
    height: 26px; /* Asegurar que tenga el mismo alto que los botones */
    text-align: center;
    border: 1px solid var(--color-texto);
    border-radius: 5px;
    font-size: 16px; /* Ajustar tamaño de letra para que se vea mejor */
  }
`;




export const Card = ({ imagen, titulo, precio, setCarrito }) => {
    const tallas = [null, 40, 41, 42, 43, 44];
    const [cantidad, setCantidad] = useState(1);
    const [tallaSeleccionada, setTallaSeleccionada] = useState(null);


    const aumentarCantidad = () => {
        setCantidad(prev => prev + 1);
    };

    const reducirCantidad = () => {
        if (cantidad > 1) {
            setCantidad(prev => prev - 1);
        }
    };



    const añadirAlCarrito = () => {
        // if (!tallaSeleccionada || tallaSeleccionada === "Talla") return;

        setCarrito(prev => {
            const existeArticulo = prev.find(articulo => 
                articulo.nombre === titulo && articulo.talla === tallaSeleccionada
            );

            if (existeArticulo) {
                return prev.map(articulo => 
                    articulo.nombre === titulo && articulo.talla === tallaSeleccionada
                        ? { ...articulo, cantidad: articulo.cantidad + cantidad }
                        : articulo
                );
            } else {
                return [...prev, { nombre: titulo, precio, cantidad, talla: tallaSeleccionada }];
            }
        });

        setCantidad(1);
        setTallaSeleccionada(null);
    };



    // const añadirAlCarrito = () => {

    //     const nuevoArticulo = {
    //         nombre: titulo,
    //         precio: precio,
    //         cantidad: cantidad,
    //         talla: tallaSeleccionada
    //     };

    //     setCarrito(prev => [...prev, nuevoArticulo]); // Usa el `setCarrito` de `App.js`
    //     setCantidad(1);
    //     setTallaSeleccionada(null);
    // };



    return (
        <Contenedor_general>
            <div className="titulo">
                {titulo}
            </div>
            <div className="div_img">
                <img src={imagen} alt="Imagen de la card" style={{ display: "block", margin: "auto" }} />
            </div>
            <div className="div_eleccion">
                <p>{new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 2
                }).format(precio)}</p>
                <select value={tallaSeleccionada || "Talla"}  onChange={(e) => setTallaSeleccionada(e.target.value)}>
                    {tallas.map((talla, index) => (
                        <option key={index} value={talla}>
                          {talla === null ? "Talla" : `EUR ${talla}`}
                        </option>
                        
                    ))}
                </select>
            </div>
            <div className="div_control">
                <div>
                    <button onClick={reducirCantidad}>-</button>
                    <input className="input" type="number" value={cantidad} readOnly />
                    <button onClick={aumentarCantidad}>+</button>
                </div>
                <div>
                    <button onClick={() => añadirAlCarrito()} disabled={(tallaSeleccionada === "Talla" || tallaSeleccionada === null) || cantidad === 0}>Añadir al carrito</button>
                </div>
            </div>
        </Contenedor_general>
)}

export default Card;