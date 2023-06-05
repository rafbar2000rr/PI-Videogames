const {Genres} = require('../db');
const axios = require('axios')
const { API_KEY } = process.env;

const getGenres = async () => {//Retorna al handler todos los géneros de la DB luego de introducirlos en la tabla Genres

    const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genres = await response.data.results.map(g => g.name)

    genres.map(g => Genres.findOrCreate({
        where: {name: g} 
    }))

    const genresDatabase = await Genres.findAll();
    return genresDatabase;
}

module.exports = {getGenres}
