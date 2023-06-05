const {Router} = require('express');
const genresRouter = Router();
const {getGenresHandler} =  require('../handlers/genresHandlers');

genresRouter.get('/', getGenresHandler);//Defino la ruta a seguir para llegar a getGenresHandler

module.exports = genresRouter;