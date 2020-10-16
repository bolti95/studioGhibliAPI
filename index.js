const express = require('express');
const hbs = require('express-handlebars');
const getGhibli = require('./lib/getGhibli');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const { request } = require('http');
require('dotenv').config();


app.engine('.hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout'
}));
app.set('view engine', '.hbs');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', async (req, res) => {
    let data = await getGhibli();
    res.render('index', {title: `Find your Ghibli film. What kind of film are you looking for?`})
})


app.post('/', async (req, res) => {
    let data = await getGhibli();
    console.log(data);
    let userSearch = req.body.titleInput;

         for (dataIndex = 0; dataIndex < data.length; dataIndex++) {
            if (data[dataIndex].title === userSearch)   {
                let result = console.log('found film')
                let title = data[dataIndex].title;
                let desc = data[dataIndex].description;
                let releaseDate = data[dataIndex].release_date
                res.render('result', { title: title, description: desc, releaseDate: releaseDate}) 
                return                
            }
                

         }  

            let result = "can't find the film you are looking for. Make sure you insert correctly!"
            let statusCode = 404;
            res.render('notFound', {title, result, statusCode})

});


app.listen(3004, () => {
    console.log('Server litening on port 3004');
    console.log(__dirname);
})
    /*process comments
        [
            {
                id: ...,
                name: ...
            },
            {
                ...
            }
         ]
    */
    /*
    match `users input` with `title` from `data` (for loop)
    if match
        send requet to ghibli + id
    else
         send 404 film not found
    */
