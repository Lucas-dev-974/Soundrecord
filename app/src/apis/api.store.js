import api from "./config";

class ApiStore {
  async all(page = 1) {
    const response = await api.get("/store?page=" + page).catch((error) => {
      console.log(error);
    });
    return response.data;
  }

  /**
   * Search on gender, type (track of: drum, guitar, ...)
   */
  async search() {}
}
export default new ApiStore();
