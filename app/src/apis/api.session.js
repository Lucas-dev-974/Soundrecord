import api from "./config";

class ApiAudio {
    // Todo manage error status code & connexion 
    async all(){
        const response = await api.post("/like", { modelid: audioid})
        return response.data
    }

    async one(sessionID){
        
    }

    async post(sessionData){
        
    }
}

export default new ApiAudio()