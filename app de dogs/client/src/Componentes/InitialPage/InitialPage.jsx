import styles from "../InitialPage/InitialPage.Module.css";
// import { Link } from "react-router-dom";

function InitialPage() {
  return (
    <div className={styles.InitialPage}>
      <h1 className={styles.title}>API DOGS</h1>
      <p className={styles.text}>... UN HERMOSO MUNDO CANINO ...</p>
      <img
        className={styles.gifDog}
        src="https://i.pinimg.com/originals/46/14/b2/4614b29d43568029a507940718d9a304.gif"
        alt="not found"
      />
      <a href="/home" className={styles.button}>
        Inicio
      </a>
      <p className={styles.parrafo}>
        Los perros son una especie que se originó hace unos treinta mil años a
        partir de un grupo ancestral común con los lobos. A lo largo de la
        historia, los perros se han adaptado a convivir con los humanos en
        diferentes culturas y regiones del mundo, compartiendo su entorno,
        hábitos y alimentación. Algunas de las civilizaciones que domesticaron y
        criaron a perros fueron el antiguo Egipto, Grecia, Roma y los aztecas.
        Los perros han desempeñado diversos roles a lo largo de la historia,
        como guardianes, cazadores, compañeros y símbolos religiosos. Hoy en
        día, los perros siguen siendo una parte importante de nuestras vidas y
        son considerados por muchos como miembros de la familia.
      </p>
    </div>
  );
}

export default InitialPage;
// https://th.bing.com/th/id/R.489e74b15fc65e71f34e3dc3049af80c?rik=Vu%2bAQ5OrgBC1yA&pid=ImgRaw&r=0
