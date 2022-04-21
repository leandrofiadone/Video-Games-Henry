const {Router} = require('express')
const videogameController = require('../Controller/videogameController.js');
const { Videogame } = require('../db')

const router = Router()


router.get('/', //async (req, res) => {
 
    videogameController.getApiInfo
    //let videoGamesTotal = await getAllVideoGames();
    //res.status(200).send(videoGamesTotal)

//}
);





// router.get('/:name', async (req, res) => {
//     const { name } = req.params;
//     const allVideoGames = await getAllVideoGames();
//     try {
//         if (name) {
//             const videoGameName = await allVideoGames.filter(e => e.name == name);
//             videoGameName.length ?
//                 res.status(200).json(videoGameName) :
//                 res.status(404).send('Pokemon no encontrado')
//         }
//     } catch (err) {
//         console.log(err)
//     }
  
// })

module.exports = router
