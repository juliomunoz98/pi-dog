const { Op } = require('sequelize');
const axios = require("axios");
const { Dog, Temperament } = require("../db.js");

const { YOUR_API_KEY } = process.env;

const getNameController = async (name) => {
    // const { name } = req.query;

    try {
        const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
        // console.log(data)
        // let contadorX = 0;
        // let contadorY = 0;
        // for (const objeto of data) {
        //     // Verifica si el objeto tiene la propiedad "x" y "y" y cuéntalas
        //     if (objeto.hasOwnProperty('image')) {
        //         contadorX++;
        //     }
        //     if (objeto.hasOwnProperty('reference_image_id')) {
        //         contadorY++;
        //     }
        // }

        // // Muestra los resultados
        // console.log(`Número de propiedades "x": ${contadorX}`);
        // console.log(`Número de propiedades "y": ${contadorY}`);
        //   Este código primero define un array de objetos llamado y luego itera sobre cada objeto en el array. Para cada objeto, verifica si tiene las propiedades "x" y "y" utilizando y , respectivamente, y aumenta los contadores y en consecuencia.arrayDeObjetosobjeto.hasOwnProperty('x')objeto.hasOwnProperty('y')contadorXcontadorY

        //   Al final, se muestran los resultados en la consola. Este código te dará el número de propiedades "x" y "y" en todos los objetos del array.

        if (name === "") {
            const dbDogs = await Dog.findAll({ include: Temperament });
            const allDogs = [...data, ...dbDogs];
            return allDogs;
        } else {
            let nameSearch = "";
            if (typeof name === "string") {
                nameSearch = name.toLowerCase();
            } else {
                throw new Error("El nombre proporcionado no es una cadena de texto");
            }
            const dbDogs = await Dog.findAll({
                where: { name: { [Op.iLike]: `%${nameSearch}%` } },
                include: Temperament
            });
            const apiDogs = data.filter(dog => {
                const dogName = dog.name ? dog.name.toLowerCase() : '';
                return dogName.includes(nameSearch);
            });

            const theDogs = [...apiDogs, ...dbDogs];

            if (theDogs.length === 0) {
                return { error: "no se encontraron los datos deseados" };
            } else {
                return theDogs;
            }
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { getNameController };