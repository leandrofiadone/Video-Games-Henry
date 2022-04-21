const { API_KEY } = process.env;
require("dotenv").config();

const API_VIDEOGAMES = `https://api.rawg.io/api/games?key=${API_KEY}`

const API_VIDEOGAMES_NAME = `https://api.rawg.io/api/games?search={name}&key=${API_KEY}&page_size=15`

const API_GENRE = `https://api.rawg.io/api/genres?key=${API_KEY}`

const API_VIDEOGAME_ID =  `https://api.rawg.io/api/games/id?key=${API_KEY}`

const API_PLATFORMS = `https://api.rawg.io/api/platforms?key=${API_KEY}`



module.exports = {
    API_VIDEOGAMES, 
    API_VIDEOGAMES_NAME,
    API_GENRE,
    API_VIDEOGAME_ID,
    API_PLATFORMS
}