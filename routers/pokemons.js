const router = require('express').Router();
const pokedexGen1 = require('../pokemon.json/pokedex.json').slice(0, 151);

const LANGUAGES_SHORT = {
    eng: 'english',
    jpn: 'japanese',
    chs: 'chinese',
    fre: 'french'
};

const TYPES_LIST = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy'
];

router.get('/', (req, res) => {
    res.json(pokedexGen1);
});

router.get('/name/:lang/:name', (req, res) => {
    const { lang, name } = req.params;

    if (!lang || !name || !Object.keys(LANGUAGES_SHORT).includes(lang.toLowerCase())) {
        return res
            .status(400)
            .json({ params: { lang: lang.toLowerCase(), name: name.toLowerCase() }, msg: "It's have something wrong" });
    }

    const pokemon = pokedexGen1.filter((pokemon) => {
        return pokemon['name'][LANGUAGES_SHORT[lang.toLowerCase()]].toLowerCase().includes(name.toLowerCase());
    });
    ß;
    return res.status(200).json(pokemon);
});

router.get('/id/:id', (req, res) => {
    const { id } = req.params;

    if (!id || parseInt(id) < 1 || parseInt(id) > 151 || isNaN(parseInt(id))) {
        return res.status(400).json({ params: { id }, msg: "It's have something wrong" });
    }

    const pokemon = pokedexGen1.filter((pokemon) => pokemon.id === parseInt(id));
    return res.status(200).json(pokemon);
});

router.get('/type/:type', (req, res) => {
    const { type } = req.params;

    if (!type || !TYPES_LIST.includes(type.toLowerCase())) {
        return res.status(400).json({
            params: { type: type.toLowerCase() },
            msg: "It's have something wrong"
        });
    }

    const pokemon = pokedexGen1.filter((pokemon) => {
        return pokemon.type.map((type) => type.toLowerCase()).includes(type.toLowerCase());
    });

    return res.json(pokemon);
});

module.exports = router;
