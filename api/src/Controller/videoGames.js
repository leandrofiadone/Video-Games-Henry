const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const axios = require('axios');
require("dotenv").config();
const {Videogame, Genre, Platform} = require('../db');

const { API_VIDEOGAMES } = require('../utils/Globales')
const { API_KEY } = process.env;

const { Op } = require("sequelize");






const getGames = async (req, res) => {

 
        const { name } = req.query
        let gamesApi = []
        let allGamesDb = []
        let gamesResults = [] //arreglo vacio
        let apiData = API_VIDEOGAMES

        
        try{
          if(!name){
                for (let index = 0; index < 5; index++) {

                let games = (await axios.get(apiData)).data //!POR QUE ESTO DE PONERLE .data ???
                let dataGame = games.results.map((G) => {
                                var game = {
                                        id: G.id,
                                        name: G.name,
                                        released: G.released,
                                        rating: G.rating,
                                        image: G.background_image,
                                        description: G.description,
                                        createdInDb: false,
                                        genres: G.genres,
                                        platforms: G.platforms.map((p)=>p.platform),
                                };
                                return game
                })
              apiData = games.next; 
              gamesApi = gamesApi.concat(dataGame) 
            //concatena los resultados de la API
                 }

              //-------------------------

             allGamesDb = await Videogame.findAll( {include:[{
              model: Genre,
              attributes:["name"],
              through: { attributes: [] }
          },
          {
              model: Platform,
              attributes:["name"],
              through: { attributes: [] }
          }]})

             gamesResults = [...allGamesDb, gamesApi]

             res.status(200).json(gamesResults)

          }else{

            let gamesResultsByName = []

            allGamesDb = await Videogame.findAll({where:{name:{[Op.iLike]:`%${name}%`}},

            include:[{
              model: Genre,
              attributes:["name"],
              through: { attributes: [] }
          },
          {
              model: Platform,
              attributes:["name"],
              through: { attributes: [] }
          }]})

          let responseApiName = (await axios.get(`https://rawg.io/api/games?key=${API_KEY}&search=${name}`)).data

          let dataGameName = responseApiName.results.map((G) => {
            var game = {
                    id: G.id,
                    name: G.name,
                    released: G.released,
                    rating: G.rating,
                    image: G.background_image,
                    description: G.description,
                    createdInDb: false,
                    genres: G.genres,
                    platforms: G.platforms.map((p)=>p.platform),
            };
            return game
          })
          // gamesResultsByName = [...dataGameName]
          // gamesResultsByName = [...allGamesDb]
          gamesResultsByName = [...allGamesDb, ...dataGameName]


          res.status(200).json(gamesResultsByName)

          }
      

    }catch(error){
        res.status(400).json({ error });
      }
    //acà

    }

//-----------------------------------------------------------------------------------------------------------------------------------------


module.exports = {
    getGames
  };