const htmlspecialchars = require("htmlspecialchars");
const { validate } = require("./validator.js");

module.exports = {
  /**
   * @summary Get only fields specified in the fields on obj
   * @param {object} obj
   * @param {array}  fields
   * @returns object of fields asked
   */
  returnFields(obj, fields) {
    let fieldsToReturn = {};
    for (const [key, value] of Object.entries(obj)) {
      fields.forEach((field) => {
        if (key == field) fieldsToReturn[key] = value;
      });
    }
    return fieldsToReturn;
  },

  /**
   * @summary Hash password
   * @param {string} password
   * @returns hashed password
   */
  // Return
  HashPassword: function (password) {
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    return password;
  },

  /**
   * @summary For sequelize database search with pagination we need certein params like {limit, offset}
   *          limit is to define how many lines we want get and offset to define how many rows  must be skipped
   * @param {integer} page
   * @param {integer} size
   * @returns limit and offset
   */
  GetPagination: function (page, size) {
    const limit = size;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  },

  /**
   *
   * @param {object} data
   * @param {integer} page
   * @param {integer} limit
   * @returns datas of asked page
   */
  GetPagingDatas: function (data, page, limit) {
    console.log(data);
    const { count: count, rows: datas } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(count / limit);

    return { totalItems: count, datas, totalPages, currentPage };
  },

  /**
   *  @summary Handle validate function from validator
   */
  validator: (body, key, value) => validate(body, key, value),

  manageCatchErrorModel: function (res, error) {
    console.log("error from model", error);
    res.status(400).json("Désoler une erreur est survenue.");
  },

  exclude: function (arr, to_excl) {
    if (typeof arr == "array") {
      if (typeof to_excl == "string") {
        if (arr.includes(to_excl)) delete arr[to_excl];
      } else if (typeof to_excl == "array") {
        to_excl.forEeach((toexcl) => {
          if (arr.includes(toexcl)) delete arr[to_excl];
        });
      }
    } else if (typeof arr == "object") {
      console.log(typeof to_excl);
      if (typeof to_excl == "string") {
        if (arr.includes(to_excl)) delete arr[to_excl];
      } else if (typeof to_excl == "object") {
        for (const property in arr) {
          console.log(arr[property]);
        }
      }
    }
    return arr;
  },
};
