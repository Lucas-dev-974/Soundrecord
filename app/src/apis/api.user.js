import api from "./config";

class ApiUser {
  async get(pseudo) {
    const response = await api.get("/user/" + pseudo).catch((error) => {
      console.log(error);
    });

    console.log("api response", response);
    // TODO: manage error
    return response.data;
  }

}
export default new ApiUser();
