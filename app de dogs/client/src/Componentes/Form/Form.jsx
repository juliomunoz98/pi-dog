import { useEffect, useState } from "react";
import axios from "axios";
import validation from "./Validation";
import styles from "../Form/Form.Module.css";
import { useHistory } from "react-router-dom";

function Form() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    height: "",
    weight: "",
    years: "",
    image: "",
    temperaments: [],
  });
  const [temperaments, setTemperaments] = useState([]);

  //max y min peso
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100);

  const handleMinChange = (event) => {
    setMinValue(event.target.value);
  };
  const handleMaxChange = (event) => {
    setMaxValue(event.target.value);
  };

  //max y min altura
  const [minValueN, setMinValueN] = useState(1);
  const [maxValueN, setMaxValueN] = useState(100);

  const handleMinChangeN = (event) => {
    setMinValueN(event.target.value);
  };
  const handleMaxChangeN = (event) => {
    setMaxValueN(event.target.value);
  };

  // max y min edad
  const [minValueY, setMinValueY] = useState(1);
  const [maxValueY, setMaxValueY] = useState(100);

  const handleMinChangeY = (event) => {
    setMinValueY(event.target.value);
  };
  const handleMaxChangeY = (event) => {
    setMaxValueY(event.target.value);
  };

  const [errors, setErrors] = useState({
    name: "",
    height: "",
    weight: "",
    years: "",
    image: "",
    temperaments: [],
  });

  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validation({
        ...formData,
        [e.target.name]: e.target.value,
      })
    );
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      weight: `${minValue.toString()} - ${maxValue.toString()}`,
      height: `${minValueN.toString()} - ${maxValueN.toString()}`,
      years: `${minValueY.toString()} - ${maxValueY.toString()}`,
    }));
  }, [minValue, maxValue, minValueN, maxValueN, minValueY, maxValueY]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/temperaments");
        setTemperaments(data);
      } catch (error) {
        window.alert("No se puede traer la informacion");
      }
    };
    getData();
  }, []);

  // Función para manejar cambios en un checkbox
  const handleCheckboxChange = (e) => {
    // Obtiene el valor del checkbox
    const tempSeleccionada = e.target.value;
    // Crea una copia del arreglo de temperamentos del estado del formulario
    let temperaments = [...formData.temperaments];
    // console.log(temperaments);
    // Si el checkbox está seleccionado
    if (e.target.checked) {
      // Agrega el valor del checkbox al arreglo de temperamentos
      temperaments.push(tempSeleccionada);
    } else {
      // Si el checkbox no está seleccionado, remueve el valor del arreglo de temperamentos
      temperaments = temperaments.filter((tipo) => tipo !== tempSeleccionada);
    }
    // Actualiza el estado del formulario con los nuevos valores de temperamentos
    setFormData({ ...formData, temperaments });

    // Ejecuta una función de validación y actualiza el estado de errores
    setErrors(
      validation({
        ...formData,
        temperaments,
      })
    );
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    // Previene la acción por defecto del evento de envío
    event.preventDefault();

    // Ejecuta una función de validación y actualiza el estado de errores
    const validationErrors = validation(formData);
    setErrors(validationErrors);

    // Si no hay errores en la validación
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Envía una solicitud POST a una dirección local con los datos del formulario
        await axios.post("http://localhost:3001/dogs", formData);
        history.push("/home");
        // Limpia los campos del formulario y actualiza el estado
        // setFormData({
        //   name: "",
        //   height: "",
        //   weight: "",
        //   years: "",
        //   image: "",
        //   temperaments: [],
        // });
        // Muestra un mensaje indicando que la raza ha sido creada exitosamente
        // setSubmitMessage("La raza ha sido creada exitosamente.");
        window.alert("La raza ha sido creada exitosamente.");
      } catch (error) {
        // Si ocurre un error al enviar la solicitud, muestra un mensaje de error
        setSubmitMessage("Hubo un error al enviar la solicitud.");
      }
    } else {
      // Si hay errores en la validación, muestra un mensaje indicando que faltan datos en el formulario
      setSubmitMessage("Faltan datos en el formulario.");
    }
  };

  return (
    <div className={styles.fondo}>
      <div className={styles.formContainer}>
        <h1>INGRESE NUEVA RAZA</h1>
        {submitMessage && <p>{submitMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              name="name"
              placeholder="Ingresa el nombre aqui"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name && styles.warning}
            />
            <p className={errors.name && styles.danger}>
              <br />
              {errors.name}
            </p>
          </label>

          <br />
          <label>
            Altura de la raza: <div></div>
            <div>
              <input
                type="range"
                min="1"
                max="100"
                value={minValueN}
                onChange={handleMinChangeN}
              />
              <input
                type="range"
                min={minValueN}
                max="100"
                value={maxValueN}
                onChange={handleMaxChangeN}
              />
              <p>
                MIN: {minValueN} --- MAX: {maxValueN}
              </p>
            </div>
          </label>

          <br />
          <label>
            Peso de la raza: <div></div>
            <div>
              <input
                type="range"
                min="1"
                max="100"
                value={minValue}
                onChange={handleMinChange}
              />
              <input
                type="range"
                min={minValue}
                max="100"
                value={maxValue}
                onChange={handleMaxChange}
              />
              <p>
                MIN: {minValue} --- MAX: {maxValue}
              </p>
            </div>{" "}
          </label>

          <br />
          <label>
            Edad de la raza: <div></div>
            <div>
              <input
                type="range"
                min="1"
                max="100"
                value={minValueY}
                onChange={handleMinChangeY}
              />
              <input
                type="range"
                min={minValueY}
                max="100"
                value={maxValueY}
                onChange={handleMaxChangeY}
              />
              <p>
                MIN: {minValueY} --- MAX: {maxValueY}
              </p>
            </div>
          </label>
          <br />
          <label>
            Image:
            <input
              name="image"
              type="text"
              placeholder="Ingresa la URL aqui"
              value={formData.image}
              onChange={handleInputChange}
              className={errors.image && styles.warning}
            />{" "}
            <p className={errors.image && styles.danger}>{errors.image}</p>
          </label>

          <br />
          <div className={styles.temperamentList}>
            {temperaments.map((e) => (
              <div className={styles.temperamentItem} key={e}>
                <label className={styles.temperamentLabel}>
                  <input
                    className={styles.temperamentCheckbox}
                    name="temperaments"
                    type="checkbox"
                    value={e}
                    checked={formData.temperaments.includes(e)}
                    onChange={handleCheckboxChange}
                  />
                  {e}
                </label>
              </div>
            ))}
          </div>

          <p className={errors.temperaments && styles.danger}>
            {errors.temperaments}
          </p>

          <br />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
