const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const axios = require('axios');
require("dotenv").config();
const { API_GENRE } = require('../utils/Globales')
const { Genre } = require('../db.js');



const getGenre = async (req,res)=> {

    try{
      const results = await Genre.findAll()
        res.json({results})
    }catch(err){
        res.send(err)
    }
}


// const getGenreInfoApi = async (req, res) =>{

//     try{
//         const genresAPI = await axios.get(API_GENRE)
//         genresAPI.data.results.forEach(genre => {
//             Genre.findOrCreate({
//                 where: { name: genre.name }
//             })
//         })
//         const genresDB = await Genre.findAll()
//         res.status(200).json(genresDB)

//     } catch(e){
//         return res.status(400).json({ message: e });
//       }

// }



module.exports = {
    getGenre,
    //getGenreInfoApi
  };