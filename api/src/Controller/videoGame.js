const axios = require('axios');

const {Videogame, Genre, Platform} = require('../db');
const { API_KEY } = process.env;

const idVideoGame = async (req, res) =>{

    try{

    const  { idGame } = req.params

    

    if (idGame.length > 10) {
        const dbGame = await Videogame.findByPk( 
            
            //!USAR FINDBYPK
            idGame,{
        //   where: {
        //     id: idGame
        //   },
        //   attributes: ['id', 'name', 'background_image', 'description', 'released', 'rating'],

          include:[{
              model: Platform,
              attributes: ['id','name'],
              through: {
                  attributes: []
              }
          },
          {
            model: Genre,
            attributes: ['id', 'name'],
            through: {
              attributes: []
            }
          }]
          
        })
        return dbGame ? res.json(dbGame) : res.status(404).send({msg: "Juego no encontrado"})
      }

    let gameSearchFound, gameSearch
    
    gameSearch = await axios.get(`https://api.rawg.io/api/games/${idGame}?key=${API_KEY}`)


    const {id, name, description, released, rating, platforms, genres, background_image} = gameSearch.data

    gameSearchFound ={
        id: id, 
        name: name,
        image: background_image,
        description: description.replace(/<p>/g, "").replace(/<\/p>/g, "").replace(/<br\s*[\/]?>/gi, ""), //! REVISAR
        released_date: released,
        rating: rating,
        platforms: platforms.map((plat) => {
            return plat ? {
                id: plat.platform.id,
                name: plat.platform.name,
            } : []
        }),
        genres: genres.map((genre) => {
            return genre ? {
                id: genre.id,
                name: genre.name,
            } : []
        })
    }
    res.json(gameSearchFound)

} catch (err) {res.status(400).json({ err })}

}

//--------------------------------------------------------------------------------------------------------------------------
const createVideoGame = async (req, res) => {

    try{
        const { name, description, background_image, released, rating, platforms, genres, createdInDb} = req.body;

            let gameCreated = await Videogame.create({ //!USAR FINDORCREATE
                name,
                description,
                background_image, 
                released,
                rating,
                createdInDb
                
            })

            platforms.forEach(async (gameName) => {
                let platformName = await Platform.findOne({ where: { name: gameName } })
                await gameCreated.addPlatform(platformName)
            })
           

            genres.forEach(async (gameName) => {
                let genresGame = await Genre.findOne({ where: { name: gameName } })
                await gameCreated.addGenre(genresGame)
            })

                res.status(200).send('Videogame created successfully!')

                }catch(err) {
                        res.status(404).json({ err })
                    }
                    
                    }

module.exports = {
    createVideoGame,
    idVideoGame
};