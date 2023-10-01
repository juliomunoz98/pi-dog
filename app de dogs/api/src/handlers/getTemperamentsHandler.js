const { getTemperamentsController } = require("../controlles/getTemperamentsController")

const getTemperamentsHandler = async (req, res) => {
    const { YOUR_API_KEY } = req.query; // Obtenemos el valor de YOUR_API_KEY de los parámetros de la solicitud
    try {
        const temperaments = await getTemperamentsController(YOUR_API_KEY);
        // Llamamos a la función getTemperamentsController pasando YOUR_API_KEY como argumento y esperamos a que se resuelva
        // La función getTemperamentsController obtiene los temperamentos y los devuelve como resultado

        res.status(200).json(temperaments);
        // Enviamos una respuesta con estado 200 y el resultado de los temperamentos en formato JSON
    } catch (error) {
        res.status(400).json({ error: error.message });
        // Si ocurre algún error durante la ejecución, enviamos una respuesta con estado 400 y el mensaje de error en formato JSON
    }
}

module.exports = { getTemperamentsHandler };