const models = require("../models");
const { validator } = require("../utils.js");
const { GetPagination, GetPagingDatas } = require("../utils.js");
const { Op } = require("sequelize");

module.exports = {
  SearchSession: async function (req, res) {
    const validated = validator(req.body, { query: "string" });
    console.log("valdated:", validated);
    const { limit, offset } = GetPagination(req.page, req.size);
    const sessions = await models.Session.findAndCountAll({
      where: {
        session_name: {
          [Op.like]: "%" + validated.query + "%",
        },
      },
      limit: limit,
      offset: offset,
    }).catch((erro) => console.log(erro));
    console.log("Sessions:", sessions);

    for (const key in sessions.rows) {
      const session = sessions.rows[key].dataValues;
      let imports = await models.SessionTrack.findAll({
        where: { sessionid: session.id },
      });
      sessions.rows[key].dataValues.importedIn = imports.count;
    }

    const response = GetPagingDatas(sessions, validated.page, limit);
    return res.status(200).json(response);
  },

  SearchUser: async function (req, res) {
    const validated = validator(req.body, {
      query: "string",
      size: "int",
      page: "int",
    });

    const { limit, offset } = GetPagination(validated.page, validated.size);

    const search = await models.User.findAll({
      where: [
        { name: "%" + validated.query + "%" },
        { email: "%" + validated.query + "%" },
      ],
      limit: limit,
      offset: offset,
    }).catch((erro) => console.log(erro));

    const response = GetPagingDatas(search, validated.page, limit);
    return res.status(200).json(response);
  },

  SearchImport: async function (req, res) {
    const validated = validator(req.body, {
      query: "string",
      size: "int",
      page: "int",
    });

    const { limit, offset } = GetPagination(validated.page, validated.size);

    const search = await models.Import.findAll({
      where: {
        name: "%" + validated.query + "%",
      },
      limit: limit,
      offset: offset,
    }).catch((erro) => console.log(erro));

    const response = GetPagingDatas(search, validated.page, limit);
    return res.status(200).json(response);
  },

  SearchAudio: async function (req, res) {
    const validated = validator(req.body, {
      query: "string|required",
    });

    if (validated.errors != undefined)
      return res.status(400).json(validated.errors);

    console.log("req.page", req.page);
    const { limit, offset } = GetPagination(req.page, req.size);

    const search = await models.Audio.findAndCountAll({
      where: {
        name: {
          [Op.like]: "%" + validated.query + "%",
        },
        public: true,
      },
      limit: limit,
      offset: offset,
    }).catch((erro) => console.log(erro));

    const response = GetPagingDatas(search.datas, req.page, limit);
    return res.status(200).json(response);
  },
};
