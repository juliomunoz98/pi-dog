import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Nav/Nav.Module.css";

function Nav(props) {
  const [recipeName, setRecipeName] = useState("");

  const handleSearch = (event) => {
    let { value } = event.target;
    setRecipeName(value);
  };

  const handleSearchSubmit = () => {
    props.onSearch(recipeName.toLowerCase()); // Convertir el valor de búsqueda a minúsculas
  };

  return (
    <div className={styles.NavPrimari}>
      <Link to="/">
        <div className={styles.bexit}>Exit</div>
      </Link>
      <Link to="/home">
        <div className={styles.binicio}>Home</div>
      </Link>
      <div className={styles.barraBusqueda}>
        <input
          placeholder="BUSQUEDA"
          type="search"
          onChange={handleSearch}
          value={recipeName}
        />
        <button onClick={handleSearchSubmit}>BUSCAR RAZA</button>
        <Link to="/form">
          <button>AGREGAR RAZA</button>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
