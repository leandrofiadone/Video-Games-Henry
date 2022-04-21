const { Router } = require('express');
const { getGenreDb } = require('../Controller/genreController');
const axios = require('axios');


const router = Router()

router.get('/', async (req, res) => {
    const resultGenre = await getGenreDb()
    res.json(resultGenre)
})

module.exports = router;