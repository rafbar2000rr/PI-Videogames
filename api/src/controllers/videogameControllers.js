const {Videogame, Genres} = require('../db')
const axios = require('axios');
const { API_KEY } = process.env;

const videosApi = async() => {//Retorna a getAllvideos los videos de la Api
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`
    let videosApi = []
    
        for(let i=0; i<5; i++) { 
            const resolve = await axios.get(url) 
        
            resolve.data.results.map(v => { 
                videosApi.push({ 
                    id: v.id,
                    name: v.name,
                    image: v.background_image,
                    rating: v.rating,
                    platforms: v.platforms?.map(el => el.platform.name),
                    genres: v.genres?.map(el => el.name)
                })
            });
            
            url = resolve.data.next
        }
        return videosApi;
};


const videosDB = async () => {//Retorna a getAllvideos los videos de la DB
    
    return await Videogame.findAll({  
           include: [{
               model: Genres, 
               atributes: ['name'], 
               throught: { 
                   attributes: [] 
               }
           }]
       })
    
}


const getAllVideos = async () => {//Retorna al handler los videos de la Api y la DB
    
    const allVideosApi = await videosApi ();
    const allVideosDB = await videosDB();
    
    const allVideos = allVideosDB.concat(allVideosApi)
    return allVideos
}



const searchVideoByname = async (name) => {//Retorna al handler los videos que tienen el name
   
    const databaseVideos = await Videogame.findAll({where: {name: name}});
    let apiVideos = await getAllVideos();
    apiVideos =  await apiVideos.filter(a=>a.name.toLowerCase().includes(name.toLowerCase())).slice(0,15)
    
    return [...apiVideos, ...databaseVideos];
};

const createVideo = async (name, description, platforms, image, released, rating, genres) => {//Retorna al handler el video creado
    const newVideo = await Videogame.create({name, description, platforms, image, released, rating});
    const getGenres = await Genres.findAll({
        where: {
            name: genres,
        }
    });
    
    await newVideo.addGenres(getGenres);
    return newVideo;
};




const getVideoById = async(id, source) => {//Retorna un video por su id

    var videogame= {};
    if(source === 'api'){
        const vData = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;
           videogame = {
             id: vData.id,
             name:  vData.name,
             image:  vData.background_image,
             platforms: vData.platforms.map(p=>p.platform.name),
             description:  vData.description,
             released: vData.released, 
             rating:  vData.rating,
             genres: vData.genres.map(g=>g.name)
        }

    } else {
        videogame=await Videogame.findByPk(id, {
          include: {
              model: Genres,
              attributes: ['name'],
            through:{
              attributes:[]
            }
        },
    });
    }
    return videogame;
}






module.exports = {createVideo, getVideoById, getAllVideos, searchVideoByname};