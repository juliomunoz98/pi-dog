const { Router } = require('express');

const { getTemperamentsHandler } = require("../handlers/getTemperamentsHandler");

const getTemperamentsRouter = Router();

getTemperamentsRouter.get("/", getTemperamentsHandler);

module.exports = getTemperamentsRouter;