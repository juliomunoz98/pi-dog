const { Router } = require('express');

const { getIdHandler } = require("../handlers/getIdHandler");
const { getNameHandler } = require("../handlers/getNameHandler");
const { postDog } = require('../controlles/postDogscontroller');
const { getIdBdHandler } = require("../handlers/getIdBdHandler");
// const { postDogsHandler } = require("../handlers/postDogsHandler");


const getDogsRouter = Router();

getDogsRouter.get("/", getNameHandler);
getDogsRouter.get("/:id", getIdHandler);
getDogsRouter.get("/dogs-bd/:id", getIdBdHandler);
getDogsRouter.post("/", postDog);

module.exports = getDogsRouter;