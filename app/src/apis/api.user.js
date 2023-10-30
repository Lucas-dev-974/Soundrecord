import api from "./config";

class ApiUser {
  async get(pseudo) {
    const response = await api.get("/user/" + pseudo).catch((error) => {
      console.log(error);
    });

    if (!response) return false;
    // TODO: manage error
    return response.data;
  }

  async profile(pseudo) {
    const response = await api
      .get("/profile?pseudo=" + pseudo)
      .catch((error) => {
        console.log(error);
      });
    if (!response.data) return false;
    return response.data;
  }

  async update(id, datas) {
    const response = await api.patch("/user/" + id, datas);
    return response.data;
  }

  async register(datas) {
    const response = await api.patch("/auth", datas).catch((error) => {
      return error.response;
    });

    if (response.status != 200) {
      window.App.$store.commit("push_alert", {
        message: response.data.message,
        type: "info",
      });
      return false;
    }
    return response.data;
  }

  async login(datas) {
    const response = await api.post("/auth", datas).catch((error) => {
      return error.response;
    });

    if (response.status != 200) {
      window.App.$store.commit("push_alert", {
        message: response.data.message,
        type: "info",
      });
      return false;
    }
    return response.data;
  }

  async uploadPictureProfile(file) {
    const formData = new FormData();
    formData.append("picture", file);

    const response = await api.post("/user-picture", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": undefined,
      },
    });

    return response;
  }
}

export default new ApiUser();
