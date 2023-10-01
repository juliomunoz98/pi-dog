const { getIdController } = require("../controlles/getIdController");

const getIdHandler = async (req, res) => {
    const { id } = req.params; // Obtiene el parámetro "id" de la solicitud

    try {
        const object = await getIdController(id); // Llama a la función getIdController pasando el ID como argumento para obtener el objeto correspondiente
        res.status(200).json(object); // Envía una respuesta con estado 200 y devuelve el objeto obtenido
    } catch (error) {
        res.status(500).json({ error: error.message }); // Captura cualquier error y envía una respuesta con estado 500 y un mensaje de error
    }
}

module.exports = { getIdHandler }; 