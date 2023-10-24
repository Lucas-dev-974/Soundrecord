import api from "./config";

class ApiAudio {
  // Todo manage error status code & connexion
  async like(audioid) {
    const response = await api.post("/like", { modelid: audioid });
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
}

export default new ApiAudio();
