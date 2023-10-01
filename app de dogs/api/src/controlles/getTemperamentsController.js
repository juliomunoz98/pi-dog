require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const axios = require("axios");
const { Temperament } = require("../db.js");

const getTemperamentsController = async (YOUR_API_KEY) => {
    const temperamentsbd = await Temperament.findAll();

    // Consultamos todos los temperamentos existentes en la base de datos

    if (temperamentsbd.length === 0) {
        // Si no hay temperamentos en la base de datos, hacemos una llamada a la API

        const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);

        // Hacemos una solicitud a la API para obtener los datos de las razas de perros

        let temperamentsObj = [];
        // Creamos un arreglo para almacenar los temperamentos

        data.forEach((objeto) => {
            // Iteramos sobre cada objeto en el arreglo data

            if (!objeto.hasOwnProperty('temperament')) {
                // Si el objeto no tiene la propiedad 'temperament'

                temperamentsObj.push("sin temperamentos asociados");
                // Agregamos la frase "sin temperamentos asociados" al arreglo temperamentsObj
            } else {
                const temperamentosSeparados = objeto.temperament.split(",");
                // Dividimos la cadena de temperamentos en un arreglo utilizando la coma como separador

                temperamentsObj = temperamentsObj.concat(temperamentosSeparados.map((temperamento) => temperamento.trim()));
                // Eliminamos los espacios en blanco alrededor de cada temperamento y los agregamos al arreglo temperamentsObj
            }
        });

        const temperamentosUnicos = Array.from(new Set(temperamentsObj));
        // Eliminamos los duplicados de los temperamentos utilizando un conjunto (Set) y luego los convertimos nuevamente a un arreglo

        const arrTemperaments = temperamentosUnicos.map((diet1) => ({ name: diet1 }));
        // Creamos un arreglo de objetos para los temperamentos obtenidos

        await Temperament.bulkCreate(arrTemperaments);
        // Creamos los registros de temperamentos en la base de datos utilizando el método bulkCreate del modelo Temperament

        const temperamentsCreated = await Temperament.findAll();
        // Consultamos nuevamente los temperamentos después de crear los registros

        const temperamentsMap = temperamentsCreated.map((e) => e.name);
        // Extraemos los nombres de los temperamentos en un nuevo arreglo

        return temperamentsMap;
        // Retornamos el arreglo de nombres de temperamentos obtenidos de la base de datos
    } else {
        const temperamentsName = temperamentsbd.map((e) => e.name);
        // Si hay temperamentos en la base de datos, obtenemos los nombres de los temperamentos en un nuevo arreglo

        return temperamentsName;
        // Retornamos el arreglo de nombres de temperamentos existentes en la base de datos
    }
};

module.exports = { getTemperamentsController };