const { Dog, Temperament } = require("../db");

const getIdBdController = async (id) => {
    try {
        if (!id) {
            throw new Error("Falta proporcionar un ID de raza");
        }

        const dbDog = await Dog.findByPk(id, {
            include: Temperament, // Incluye la relación con Temperament si está definida en tu modelo Dog
        });
        console.log(dbDog.Temperament)

        if (!dbDog) {
            throw new Error(`No se encontraron detalles para la raza con ID ${id}`);
        }

        // Reformatea los datos según sea necesario
        const dogData = {
            id: dbDog.id,
            name: dbDog.name,
            weight: dbDog.weight,
            height: dbDog.height,
            age: dbDog.age,
            image: dbDog.image,
            createInDb: dbDog.createInDb,
            temperament: dbDog.temperaments.map(temperament => temperament.name),
        };

        return dogData;
    } catch (error) {
        throw error;
    }
};

module.exports = { getIdBdController };