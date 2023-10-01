import styles from "../Card/Card.module.css";

function Card(props) {
  return (
    <div className={styles.card}>
      <img src={props.image} alt={props.name} />
      <h2>Nombre: {props.name}</h2>
      <p>Temperamentos: {props.temperament.join(", ")}</p>
      <h2>Peso: {props.weight} Lbs</h2>
    </div>
  );
}

export default Card;
