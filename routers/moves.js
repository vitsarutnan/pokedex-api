const router = require("express").Router();
const MOVES = require("../pokemon.json/moves.json");

const LANGUAGES_LIST = {
  chs: "chinese",
  jpn: "japanese",
  eng: "english",
};

const CATEGORYS_LIST = {
  chinese: ["物理", "特殊", "变化"],
  japanese: ["物理", "特殊", "变化"],
  english: ["Physical", "Special", "Status"],
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
  res.json(MOVES);
});

router.get("/categorys", (req, res) => {
  res.json(CATEGORYS_LIST);
});

router.get("/category/:lang/:category", (req, res) => {
  const { lang, category } = req.params;

  if (
    !Object.keys(LANGUAGES_LIST).includes(lang.toLowerCase()) ||
    !CATEGORYS_LIST[LANGUAGES_LIST[lang]]
      .map(Function.prototype.call, String.prototype.toLowerCase)
      .includes(category.toLowerCase())
  ) {
    return res.status(400).json({
      params: { lang: lang.toLowerCase(), category: category.toLowerCase() },
      msg: "It's have something wrong",
    });
  }

  const moves = MOVES.filter((move) =>
    move["category"][LANGUAGES_LIST[lang]]
      .toLowerCase()
      .includes(category.toLowerCase())
  );

  return res.status(200).json(moves);
});

router.get("/type/:lang/:type", (req, res) => {
  const { lang, type } = req.params;

  if (
    !Object.keys(LANGUAGES_LIST).includes(lang.toLowerCase()) ||
    !TYPES_LIST[LANGUAGES_LIST[lang]].includes(type.toLowerCase())
  ) {
    return res.status(400).json({
      params: { lang: lang.toLowerCase(), type: type.toLowerCase() },
      msg: "It's have something wrong",
    });
  }

  const moves = MOVES.filter((move) =>
    move["type"][LANGUAGES_LIST[lang]]
      .toLowerCase()
      .includes(type.toLowerCase())
  );

  return res.status(200).json(moves);
});

router.get("/name/:lang/:name", (req, res) => {
  const { lang, name } = req.params;

  if (!Object.keys(LANGUAGES_LIST).includes(lang.toLowerCase())) {
    return res.status(400).json({
      params: { lang: lang.toLowerCase(), name: name.toLowerCase() },
      msg: "It's have something wrong",
    });
  }

  const move = MOVES.filter((move) =>
    move["name"][LANGUAGES_LIST[lang]]
      .toLowerCase()
      .includes(name.toLowerCase())
  );

  return res.status(200).json(move);
});

module.exports = router;
