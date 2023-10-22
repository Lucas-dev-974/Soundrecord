import api from "./config";

export default class ApiSession {
  // Todo manage error status code & connexion
  static async all() {
    const response = await api.get("sessions");
    return response.data;
  }

  static async one(sessionID) {
    const response = await api.get("session/" + sessionID);
    return response.data;
  }

  static async create(sessionData) {
    const response = await api.post("session", sessionData);
    return response.data;
  }

  static async update(sessionData) {
    const response = await api.patch("session", sessionData);
    return response.data;
  }

  static async search(searchKey) {
    const response = await api.post("/search/sessions", { query: searchKey });
    return response.data;
  }
}
