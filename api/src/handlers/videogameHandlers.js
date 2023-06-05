const {createVideo} = require('../controllers/videogameControllers')
const {getVideoById} = require('../controllers/videogameControllers')
const {getAllVideos} = require('../controllers/videogameControllers');
const {searchVideoByname} = require('../controllers/videogameControllers');


const getVideoByIdHandler = async (req,res) => {//Retorna al cliente un video por el id
    const {id} =req.params;
    const source = isNaN(id) ? 'db' : 'api';
    try{
        const videogame = await getVideoById(id, source);
        res.status(200).json(videogame);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getVideosByNameHandler = async (req,res) => {//Retorna al cliente un video por el name
    
    const {name} = req.query;
    const results = name ? await searchVideoByname(name) : await getAllVideos();
    res.status(200).json(results);
};

const postVideosHandler = async (req,res) => {//Retorna al cliente el video creado
    const {name, description, platforms, image, released, rating, genres} = req.body;
    try{
        let newVideo = await createVideo(name, description, platforms, image, 
            released, rating, genres);
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
};




module.exports={ getVideoByIdHandler, getVideosByNameHandler, postVideosHandler};











