const router = require('express').Router();
const TYPES = require('../pokemon.json/types.json');

const LANGUAGES_LIST = {
    eng: 'english',
    jpn: 'japanese',
    chs: 'chinese'
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
    res.json(TYPES);
});

router.get('/name/:lang/:name', (req, res) => {
    const { lang, name } = req.params;

    if (
        !lang ||
        !name ||
        !Object.keys(LANGUAGES_LIST).includes(lang.toLowerCase()) ||
        !TYPES_LIST.includes(name.toLowerCase())
    ) {
        return res
            .status(400)
            .json({ params: { lang: lang.toLowerCase(), name: name.toLowerCase() }, msg: "It's have something wrong" });
    }

    const type = TYPES.filter((type) => type['label'][LANGUAGES_LIST[lang]].toLowerCase() === name);

    return res.status(200).json(type);
});

module.exports = router;
