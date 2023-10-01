const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getDogsRouter = require("./getDogsRouter");
const getTemperamentsRouter = require("./getTemperamentsRouter");

// const { getId } = require("../controlles/getId");
// const { getName } = require("../controlles/getName");
// const { getTemperaments } = require("../controlles/getTemperaments");
// const { postDogs } = require("../controlles/postDogs");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// router.get("/dogs", getName);
// router.get("/dogs/:id", getId);
// router.get("/dogs/name?=", getName);
// router.post("/dogs", postDogs);
// router.get("/temperaments", getTemperaments);


router.use("/dogs", getDogsRouter);
router.use("/temperaments", getTemperamentsRouter)

module.exports = router;
