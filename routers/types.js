const router = require("express").Router();
const TYPES = require("../pokemon.json/types.json");

const LANGUAGES_LIST = {
  chs: "chinese",
  jpn: "japanese",
  eng: "english",
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
  res.json(TYPES);
});

router.get("/name/:lang/:name", (req, res) => {
  const { lang, name } = req.params;

  if (
    !Object.keys(LANGUAGES_LIST).includes(lang.toLowerCase()) ||
    !TYPES_LIST[LANGUAGES_LIST[lang]].includes(name.toLowerCase())
  ) {
    return res.status(400).json({
      params: { lang: lang.toLowerCase(), name: name.toLowerCase() },
      msg: "It's have something wrong",
    });
  }

  const type = TYPES.filter(
    (type) =>
      type["label"][LANGUAGES_LIST[lang]].toLowerCase() === name.toLowerCase()
  );

  return res.status(200).json(type);
});

module.exports = router;
