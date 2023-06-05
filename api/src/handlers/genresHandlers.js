const {getGenres} = require('../controllers/genresControllers');

const getGenresHandler = async (req,res) => {//Retorna al cliente todos los géneros
    try {
        const genres = await getGenres()
        res.status(200).json(genres)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {getGenresHandler};



