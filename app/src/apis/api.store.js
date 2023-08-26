import api from "./config";

class ApiStore {
  async all(page) {
    
    const response = await api.get("/store?page=" + page).catch((error) => {
      console.log(error);
    });
    // TODO: manage error
    return response.data;
  }

  /**
   * Search on gender, type (track of: drum, guitar, ...)
   */
  async search(query, page) {
    const response = await api
      .post("/search/audio?page=" + page, { query: query })
      .catch((error) => {
        console.log(error);
      });

    // TODO: manage error
    return response.data;
  }
}
export default new ApiStore();
