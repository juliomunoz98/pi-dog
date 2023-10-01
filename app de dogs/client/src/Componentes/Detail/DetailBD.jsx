import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../Detail/Detail.module.css";

function DetailBD() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  // const [loading, setLoading] = useState(true); // Agregamos el estado de carga

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/dogs/dogs-bd/${id}`
        );
        // console.log(data);
        if (data) {
          const temp = data.temperament;

          const newData = {
            ...data,
            temperament: temp,
          };
          setCharacter(newData);
        } else {
          window.alert("No hay detalles para esta raza");
        }
      } catch (error) {
        console.error(error);
        // En caso de error, detenemos la carga y manejamos el error
        // setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  // if (loading) {
  //   return <div>Cargando...</div>; // Mostrar mensaje de carga
  // }
  // if (character.temperament) {
  //   const temperaments = character.temperament.split(", ");
  //   const temperamentString = temperaments.join(", ");
  // }
  return (
    <div className={styles.carta}>
      <div className={styles.container}>
        {character.id ? ( // Verificamos si hay un ID para mostrar datos
          <>
            <img
              className={styles.imagen}
              src={character.image}
              alt={character.name}
            />
            <h2>{character.id}</h2>

            <h2>Nombre: {character.name}</h2>
            <p>ALTURA PROMEDIO: {character.height} IMPERIAL</p>
            <p>PESO PROMEDIO: {character.weight && character.weight} Lbs</p>
            {character.temperament && (
              <p>TEMPERAMENTOS ASOCIADOS: {character.temperament}</p>
            )}
            {character.years && <p>EDAD PROMEDIO: {character.years}</p>}
          </>
        ) : (
          <p>No se encontraron detalles para esta raza</p>
        )}
      </div>
    </div>
  );
}

export default DetailBD;
