const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const pokemons = require('./routers/pokemons')

app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({ msg: 'Hello, world!' });
});

app.use('/pokemons', pokemons);

app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`);
});
