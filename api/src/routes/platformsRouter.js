const {Router} = require('express');
const platformsRouter = Router();
const {getPlatformsHandler} =  require('../handlers/platformsHandlers');

platformsRouter.get('/', getPlatformsHandler);//Defino las ruta a seguir para llegar a getPlatformsHandler

module.exports = platformsRouter;