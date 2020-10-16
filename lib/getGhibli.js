const { json } = require('body-parser');
const fetch = require('node-fetch');
const { request } = require('http');


const getGhibli = async (title) => {
    let url = `https://ghibliapi.herokuapp.com/films/`
    let data = await fetch(url);
    let films = await data.json();
    let usefulData = [];

    for(let film of films) {
 
        usefulData.push({
            id: film.id,
            title: film.title,
            description : film.description,
            release_date : film.release_date
        });
    }

    return usefulData;
}

module.exports = getGhibli;




       /*process comments
            film = {
                ....
            }
        */
    /*
    jsonData = [
        {
            id: ...,
            name: ...,
            whatever_else: ...
        },
        {
            ....
        },
        {
            ....
        }
    ]
    */

