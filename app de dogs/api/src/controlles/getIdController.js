require('dotenv').config();
const axios = require('axios');
const { YOUR_API_KEY } = process.env;

const getIdController = async (id) => {
    try {
        if (!id) {
            throw new Error("Falta proporcionar un ID de raza");
        }

        const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
        const object = data.find(obj => obj.id === parseInt(id));
        console.log(data)
        if (!object) {
            throw new Error(`No se encontraron detalles para la raza con ID ${id}`);
        }

        return object;
    } catch (error) {
        throw error;
    }
}

module.exports = { getIdController };
