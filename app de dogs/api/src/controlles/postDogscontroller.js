const { Dog, Temperament } = require("../db");

const postDog = async (req, res) => {
    // Extraer las propiedades name, image, height, weight, years y temperament del cuerpo de la solicitud
    const { name, image, height, weight, years, temperaments } = req.body;
    try {
        // Validar si alguna de las propiedades requeridas está faltando en la solicitud
        if (!name || !image || !height || !weight || !years || !temperaments) {
            // Si faltan datos, responder con un código de estado 400 y un mensaje de error
            return res.status(400).json({ message: "faltan datos" });
        }

        try {
            // Intentar buscar un perro con las propiedades especificadas o crear uno nuevo si no se encuentra
            const [resp, created] = await Dog.findOrCreate({ where: { name, image, height, weight, years } });

            // Si se proporcionó algún temperamento en la solicitud
            if (temperaments && temperaments.length) {
                // Buscar en la tabla Temperament los temperamentos que coincidan con los nombres especificados
                const temperamentObject = await Temperament.findAll({ where: { name: temperaments } });
                // Asignar los temperamentos encontrados al perro creado o encontrado
                await resp.addTemperament(temperamentObject);
            }
            res.status(200).json(resp);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

module.exports = { postDog };

