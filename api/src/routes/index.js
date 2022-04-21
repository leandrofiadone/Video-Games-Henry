const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();



const { getGames } = require('../Controller/videoGames');
const { getGenre} = require('../Controller/genres');
const { createVideoGame} = require('../Controller/videoGame');
const { idVideoGame} = require('../Controller/videoGame');
const { getPlatform } = require('../Controller/platform');


router.get('/videogames', getGames )

router.get('/genres', getGenre )

router.get('/platforms', getPlatform )

router.get('/videogame/:idGame', idVideoGame)

router.post('/videogame', createVideoGame)

// console.log("hola",getGames())

module.exports = router;
