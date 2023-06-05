
const {getPlatforms} = require('../controllers/platformControllers');


const getPlatformsHandler = async (req, res) => {//Retorna al cliente todas las plataformas

 try {
     const allPlatforms = await getPlatforms();
     res.status(200).json(allPlatforms);
}catch(error) {
     res.status(400).json({error: error.message})
     }
  };

 module.exports =  {getPlatformsHandler};