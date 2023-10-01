import { useState, useEffect, useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../Home/Home.Module.css";
import Card from "../Card/Card";
import {
  filterTemp,
  orderAplh,
  origin,
  orderByKg,
  fullDogs,
} from "../../redux/Actions/Actions";

export function Home({ allDogs, onSearch }) {
  const dispatch = useDispatch();

  // Estado local para mantener la lista de perros en la página actual
  const [dogsLocal, setDogsLocal] = useState([]);

  // Estado local para rastrear la página actual que se está mostrando
  const [currentPage, setCurrentPage] = useState(1);

  // Cantidad de perros por página
  const [itemsPerPage] = useState(8);

  // Calcular la cantidad total de páginas
  const totalPages = Math.ceil(dogsLocal.length / itemsPerPage);

  // Calcular el índice del último elemento en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;

  // Calcular el índice del primer elemento en la página actual
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Obtener los perros que se mostrarán en la página actual
  const currentDogs = dogsLocal.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = useCallback(
    async (query) => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/dogs?name=${query}`
        );
        const dataR = data.map((objeto) => {
          const newObjet = { ...objeto };
          if (!newObjet.hasOwnProperty("temperament")) {
            newObjet.temperament = ["sin temperamentos asociados"];
          } else {
            newObjet.temperament = newObjet.temperament.split(", ");
          }
          return newObjet;
        });
        // Despachamos la acción fullDogs para actualizar el estado en Redux
        dispatch(fullDogs(dataR));
      } catch (error) {
        window.alert(error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    // Actualizar el estado local de la lista de perros cuando cambia la prop allDogs
    setDogsLocal(allDogs);
  }, [allDogs]);

  useEffect(() => {
    // Cargar los temperamentos desde la API cuando se monta el componente

    async function fetchData() {
      try {
        const { data } = await axios.get(`http://localhost:3001/temperaments`);
        if (data) {
          setTemps(data);
        } else {
          window.alert(
            "No hay temperamentos: problemas en el componente cards"
          );
        }
      } catch (error) {
        window.alert(error);
      }
    }
    fetchData();

    // Realizar la búsqueda inicial de perros
    handleSearch("");
  }, [handleSearch]);
  useEffect(() => {
    setCurrentPage(1);
  }, [allDogs]);

  const [temps, setTemps] = useState([]);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div className={styles.fondo}>
        <div className={styles.optionns}>
          {/* Select para filtrar por temperamento */}
          <select
            className={styles.myselect}
            onChange={(e) => dispatch(filterTemp(e.target.value))}
          >
            {temps.map((e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            ))}
          </select>
          <br />

          {/* Select para ordenar alfabéticamente */}
          <select
            className={styles.myselect}
            onChange={(e) => dispatch(orderAplh(e.target.value))}
          >
            {["Ascendente", "Descendente"].map((e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            ))}
          </select>
          <br />

          {/* Select para ordenar por peso */}
          <select
            className={styles.myselect}
            onChange={(e) => dispatch(orderByKg(e.target.value))}
          >
            {["Mayor peso", "Menor peso"].map((e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            ))}
          </select>
          <br />

          {/* Select para filtrar por origen */}
          <select
            className={styles.myselect}
            onChange={(e) => dispatch(origin(e.target.value))}
          >
            {["Api", "Created"].map((e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            ))}
          </select>
          <br />

          {/* Botón para resetear los filtros */}
          <button className={styles.myselect} onClick={() => onSearch("")}>
            RESET
          </button>
        </div>
        <div>
          <div className={styles.cards}>
            {/* Renderizar los perros actuales */}
            {currentDogs.map((dog) =>
              dog.years ? (
                <Link to={`/detailBd/${dog.id}`} key={dog.name}>
                  <Card
                    key={dog.id}
                    name={dog.name}
                    image={dog.image}
                    temperament={dog.temperaments.map((e) => e.name)}
                    weight={dog.weight}
                  />
                </Link>
              ) : (
                <Link to={`/apidet/${dog.id}`} key={dog.name}>
                  <Card
                    key={dog.id}
                    name={dog.name}
                    image={dog.image.url}
                    temperament={dog.temperament}
                    weight={dog.weight.imperial}
                  />
                </Link>
              )
            )}
          </div>
          <div className={styles.pagboton}>
            {/* Renderizar la lista de botones de página */}
            <ul className={styles.ulpag}>
              {pages.map((page) => (
                <li className={styles.lipag} key={page}>
                  <button
                    className={`${styles.buttonpg} ${
                      currentPage === page ? styles.active : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Función para mapear el estado de Redux a las props del componente
export function mapStateToProps(state) {
  return {
    allDogs: state.allDogs,
  };
}

// Conectar el componente a Redux y exportarlo
export default connect(mapStateToProps, null)(Home);

// function getDataWithPromise() {
//   const url = 'https://urldeunapiejemplo.com';
//   return new Promise(function(resolve, reject) {
//     fetch(url)
//       .catch((error) => {
//         reject('No he podido ir por los tweets');
//       })
//       .then((responseHttp) => {
//         console.log(responseHttp);
//         return responseHttp.json();
//       })
//       .catch((error) => {
//         console.log(error);
//         reject('No he podido transformar la respuesta a json');
//       })
//       .then((data) => {
//         resolve(data);
//       });
//   });
// }
