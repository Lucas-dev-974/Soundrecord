module.exports = {
  get: function (req, res) {},

  all: function (req, res) {
    const creations = [
      {
        id: 1,
        sessionid: 1,
        userid: 1,
        name: "crea-1",
        public: true,
        path: "/path-to-audio",
      },
      {
        id: 2,
        sessionid: 2,
        userid: 1,
        name: "crea-2",
        public: true,
        path: "/path-to-audio",
      },
      {
        id: 3,
        sessionid: 3,
        userid: 1,
        name: "crea-3",
        public: true,
        path: "/path-to-audio",
      },
    ];

    return res.status(200).json(creations);
  },
};
