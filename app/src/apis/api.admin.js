import api from "./config";

class ApiAdmin {
  // Todo manage error status code & connexion
  async all() {
    const response = await api.get("/admin/users");
    if (response.status != 200) return false;
    return response.data;
  }

  async seach(query) {
    const response = await api.get("/admin/search/users?query=" + query);
    if (response.status != 200) return false;
    return response.data;
  }

  async update(userid, datas) {
    const response = await api.patch("/admin/user/" + userid, datas);
    if (response.status != 200) return false;
    return response.data;
  }
}

export default new ApiAdmin();
