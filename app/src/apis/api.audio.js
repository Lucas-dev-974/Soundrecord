import api from "./config";

class ApiAudio {
    // Todo manage error status code & connexion 
    async like(audioid){
        const response = await api.post("/like", { modelid: audioid})
        return response.data
    }
}

export default new ApiAudio()