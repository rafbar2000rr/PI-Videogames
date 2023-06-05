const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videosRouter = require("./videogameRouter.js");
const genresRouter = require('./genresRouter.js');
const platformsRouter = require('./platformsRouter.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videosRouter);//Defino las ruta a seguir para llegar a videosRouter
router.use('/genres', genresRouter);//Defino las ruta a seguir para llegar a genResRouter
router.use('/platforms', platformsRouter);//Defino las ruta a seguir para llegar a platformsRouter

module.exports = router;
