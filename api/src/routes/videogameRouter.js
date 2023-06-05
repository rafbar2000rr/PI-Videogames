const {Router} = require('express');
const videosRouter = Router();

const { getVideoByIdHandler, getVideosByNameHandler, postVideosHandler } =  require('../handlers/videogameHandlers')


videosRouter.get('/:id', getVideoByIdHandler);//Defino las ruta a seguir para llegar a getVideoByIdHandler
videosRouter.get('/', getVideosByNameHandler);//Defino las ruta a seguir para llegar a getVideosByNameHandler
videosRouter.post('/', postVideosHandler);//Defino las ruta a seguir para llegar a postVideosHandler

module.exports = videosRouter;


