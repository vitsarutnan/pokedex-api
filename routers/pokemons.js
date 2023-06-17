const router = require("express").Router();
const POKEMONS = require("../pokemon.json/pokedex.json");

const LANGUAGES_LIST = {
  eng: "english",
  jpn: "japanese",
  chs: "chinese",
  fre: "french",
};

const TYPES_LIST = {
  chinese: [
    "一般",
    "格斗",
    "飞行",
    "毒",
    "地上",
    "岩石",
    "虫",
    "幽灵",
    "钢",
    "炎",
    "水",
    "草",
    "电",
    "超能",
    "冰",
    "龙",
    "恶",
    "妖精",
  ],
  japanese: [
    "ノーマル",
    "かくとう",
    "ひこう",
    "どく",
    "じめん",
    "岩石",
    "むし",
    "ゴースト",
    "はがね",
    "ほのお",
    "みず",
    "くさ",
    "でんき",
    "エスパー",
    "こおり",
    "ドラゴン",
    "あく",
    "フェアリー",
  ],
  english: [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
  ],
};

router.get("/", (req, res) => {
  res.json(POKEMONS);
});

router.get("/name/:lang/:name", (req, res) => {
  const { lang, name } = req.params;

  if (!Object.keys(LANGUAGES_LIST).includes(lang.toLowerCase())) {
    return res.status(400).json({
      params: { lang: lang.toLowerCase(), name: name.toLowerCase() },
      msg: "It's have something wrong",
    });
  }

  const pokemon = POKEMONS.filter((pokemon) => {
    return pokemon["name"][LANGUAGES_LIST[lang.toLowerCase()]]
      .toLowerCase()
      .includes(name.toLowerCase());
  });

  return res.status(200).json(pokemon);
});

router.get("/id/:id", (req, res) => {
  const { id } = req.params;

  if (
    parseInt(id) < 1 ||
    parseInt(id) > POKEMONS.length ||
    isNaN(parseInt(id))
  ) {
    return res
      .status(400)
      .json({ params: { id }, msg: "It's have something wrong" });
  }

  const pokemon = POKEMONS.filter((pokemon) => pokemon.id === parseInt(id));
  return res.status(200).json(pokemon);
});

router.get("/type/:lang/:type", (req, res) => {
  const { lang, type } = req.params;

  if (
    !Object.keys(LANGUAGES_LIST).includes(lang.toLowerCase()) ||
    !TYPES_LIST[LANGUAGES_LIST[lang.toLowerCase()]].includes(type.toLowerCase())
  ) {
    return res.status(400).json({
      params: { lang: lang.toLowerCase(), type: type.toLowerCase() },
      msg: "It's have something wrong",
    });
  }

  let indexType = null;
  if (lang.toLowerCase() !== "eng") {
    if (lang.toLowerCase() === "chs") {
      indexType = TYPES_LIST["chinese"].indexOf(type.toLowerCase());
    } else {
      indexType = TYPES_LIST["japanese"].indexOf(type.toLowerCase());
    }
  } else {
    indexType = TYPES_LIST["english"].indexOf(type.toLowerCase());
  }

  const pokemon = POKEMONS.filter((pokemon) => {
    return pokemon.type
      .map((type) => type.toLowerCase())
      .includes(TYPES_LIST["english"][indexType].toLowerCase());
  });

  return res.json(pokemon);
});

module.exports = router;
