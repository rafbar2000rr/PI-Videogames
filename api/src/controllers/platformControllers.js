const axios = require('axios');
const {getAllVideos} = require('./videogameControllers')


const getPlatforms = async () => {//Retorna al handler todas las plataformas
    const all = await getAllVideos();
        const allPlatforms = [];
        all.map(g => g.platforms.map(p => {
            if(!allPlatforms.includes(p)) {
                allPlatforms.push(p)
            }
        }))
        return allPlatforms;
};

module.exports = {getPlatforms};