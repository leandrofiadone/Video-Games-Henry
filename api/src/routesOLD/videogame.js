const {Router} = require('express')
const videogameController = require('../Controller/videogameController.js');
const { Videogame } = require('../db')

const router = Router()

router.get("/:id",
    videogameController.getVideoGameDetalleId
)


router.post("/",
    videogameController.createVideoGame
)



module.exports = router