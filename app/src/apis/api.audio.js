import api from "./config";

class ApiAudio {
  // Todo manage error status code & connexion
  async like(audioid) {
    const response = await api.post("/like", { modelid: audioid });
    return response.data;
  }

  async byCategorie(categorie) {
    const response = await api.get(
      "/tracks/categorie?categorieId=" + categorie
    );
    return response.data;
  }

  async library(userPseudo) {
    const response = await api.get("/library?userPseudo=" + userPseudo);
    return response.data;
  }

  async plailyst(userPseudo) {
    const response = await api.get("playlists?userPseudo=" + userPseudo);
    return response.data;
  }

  async update(datas) {
    const response = await api.patch("/track", datas);
    return response.data;
  }

  async delete(trackid) {
    const response = await api.delete("/track/" + trackid);
    return response.data;
  }

  async upload(formData) {
    const response = await api
      .post("/track", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": undefined,
        },
      })
      .catch((error) => error.response);
    console.log(response);
    if (response.status != 200) {
      window.App.$store.commit("push_alert", {
        message: response.data.message
          ? response.data.message
          : response.data.error,
        type: "info",
      });
      console.log("ookok");
    }
    return response.data;
  }
}

export default new ApiAudio();
