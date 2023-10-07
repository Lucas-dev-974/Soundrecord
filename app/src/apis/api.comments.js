import api from "./config";

class ApiComment {
    // Todo manage error status code & connexion 
    async getCommentForAudio(audioid){
        const response = await api.get("/comments/" + audioid)
        console.log(response);
        return response.data
    }

    async postComment(audioid, content){
        const response = await api.post("/comment", {
            audioid: audioid,
            content: content
        })

        console.log(response);
        return response.data
    }

    async deleteComment(commentid){
        const response = await api.delete("/comment/" + commentid)
        return response.data
    }

    async singalComment(commentid){
        const response = await api.post("/signal/comment/" + commentid)
        return response.data
    }
}

export default new ApiComment()