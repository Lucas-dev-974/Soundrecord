import api from "./config";

class ApiPlaylist {
  static async playlists(userPseudo) {
    const response = await api.get("playlists?userPseudo=" + userPseudo);
    return response.data;
  }

  static async create(playlistName = "Nom par défaut") {
    const response = await api.post("/playlist", { name: playlistName });
    return response.data;
  }

  static async delete(plailystId) {
    const response = await api.delete("/playlist/" + plailystId);
    return response.data;
  }

  static async update(datas) {
    const response = await api.patch("/playlist", datas);
    return response.data;
  }

  static async appendTrack(playlistId, trackId) {
    const response = await api.post("/playlist/add-audio", {
      plailystid: playlistId,
      trackid: trackId,
    });

    return response.data;
  }

  static async removeTrack(playlistId, trackId) {
    const response = await api.delete(
      "/playlist/" + playlistId + "/" + trackId,
      {
        plailystid: playlistId,
        trackid: trackId,
      }
    );

    return response.data;
  }
}

export default ApiPlaylist;
