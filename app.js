const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

const pokemons = require('./routers/pokemons');
const types = require('./routers/types');
const items = require('./routers/items');
const moves = require('./routers/moves');

app.use(cors());
app.use(morgan('dev'));

app.use(express.static('pokemon.json/images'));

app.get('/', (req, res) => {
    res.json({ msg: 'Pokédex (National Pokédex number 1 - 809)' });
});

app.use('/', express.static(path.join(__dirname, 'images')));

app.use('/pokemons', pokemons);
app.use('/types', types);
app.use('/items', items);
app.use('/moves', moves);

app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`);
});
