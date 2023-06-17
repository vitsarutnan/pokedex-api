const router = require("express").Router();
const ITEMS = require("../pokemon.json/items.json");

const LANGUAGES_LIST = {
  eng: "english",
  jpn: "japanese",
  chs: "chinese",
};

const ITEM_TYPES_LIST = [
  "Pokeballs",
  "Medicine",
  "Battle items",
  "General items",
  "Hold items",
  "Key Items",
  "Berries",
  "Machines",
];

router.get("/", (req, res) => {
  res.json(ITEMS);
});

router.get("/types", (req, res) => {
  return res.json({ types: ITEM_TYPES_LIST });
});

router.get("/id/:id", (req, res) => {
  const { id } = req.params;

  if (parseInt(id) < 1 || parseInt(id) > ITEMS.length || isNaN(parseInt(id))) {
    return res
      .status(400)
      .json({ params: { id }, msg: "It's have something wrong" });
  }

  const item = ITEMS.filter((item) => item.id === parseInt(id));
  return res.status(200).json(item);
});

router.get("/types/:type", (req, res) => {
  const { type } = req.params;

  if (
    !ITEM_TYPES_LIST.map(
      Function.prototype.call,
      String.prototype.toLowerCase
    ).includes(type.toLowerCase())
  ) {
    return res.status(400).json({
      params: { type: type.toLowerCase() },
      msg: "It's have something wrong",
    });
  }

  const items = ITEMS.filter(
    (item) => item.type.toLowerCase() === type.toLowerCase()
  );

  return res.status(200).json(items);
});

router.get("/name/:lang/:name", (req, res) => {
  const { lang, name } = req.params;

  if (!Object.keys(LANGUAGES_LIST).includes(lang.toLowerCase())) {
    return res.status(400).json({
      params: { lang: lang.toLowerCase(), name: name.toLowerCase() },
      msg: "It's have something wrong",
    });
  }

  const items = ITEMS.filter((item) =>
    item["name"][LANGUAGES_LIST[lang]]
      .toLowerCase()
      .includes(name.toLowerCase())
  );

  return res.status(200).json(items);
});

module.exports = router;
