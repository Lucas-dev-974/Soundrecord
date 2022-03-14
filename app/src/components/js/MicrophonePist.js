export default{
    data(){
        return {
            type: 'microphone',
            media: null
        }
    },

    mounted(){
        const audio = this.$refs.player
        const constraint = {
            audio: true, video: false
        }

        navigator.mediaDevices.getUserMedia(constraint)
        .then(media => {
            this.media = media
            audio.srcObject = media
        })
    }
}