import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../Detail/Detail.module.css";

function DetailApi() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  // const [characterZ, setCharacterZ] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`http://localhost:3001/dogs/${id}`);
        // console.log(data);
        // console.log(image);
        if (data) {
          // const aux = data[0];
          setCharacter(data);
          // if (aux.image) {
          //   setCharacter(aux);
          // } else {
          //   window.alert("El objeto no tiene una propiedad 'image'");
          // }
        } else {
          window.alert("No hay detalles para esta receta");
        }
      } catch (error) {
        window.alert(error);
      }
    }
    fetchData();
  }, [id]);

  const { name, height, weight, life_span, image, temperament } = character;
  // console.log(character);

  return (
    <div className={styles.carta}>
      <div className={styles.container}>
        {Object.keys(character).length === 0 ? (
          <p>Cargando...</p>
        ) : (
          <>
            <img src={image && image?.url} alt={name} />
            <h2>{id}</h2>
            <h2>Nombre: {name}</h2>
            <p>Altura: {height?.imperial}</p>
            <p>Peso: {weight && weight?.imperial} Lbs</p>
            <p>Temperament: {temperament}</p>
            <p>Edad: {life_span}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailApi;
