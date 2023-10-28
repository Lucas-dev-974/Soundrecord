import api from "./config";

class ApiCategorie {
  // Todo manage error status code & connexion
  async all() {
    const response = await api.get("/categories");
    if (response.status != 200) return false;
    return response.data;
  }
}

export default new ApiCategorie();
