const { getNameController } = require("../controlles/getNameController");

const getNameHandler = async (req, res) => {
    const { name } = req.query; // Obtiene el parámetro "name" de la consulta (query)

    try {
        const allDogs = await getNameController(name); // Llama a la función getNameController pasando el nombre como argumento para obtener todos los perros con ese nombre

        // Aquí, verifica si allDogs es un objeto con una propiedad "error"
        if (allDogs && allDogs.error) {
            res.status(400).json(allDogs); // Si hay un error, envía la respuesta de error
        } else {
            res.status(200).json(allDogs); // Si no hay error, envía la respuesta exitosa con los datos encontrados
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Captura cualquier otro error y envía una respuesta con estado 500 y un mensaje de error
    }
}

module.exports = { getNameHandler };