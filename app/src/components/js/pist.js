import ApiService from "../../services/ApiService";

export default{
    props: {
        pist: { required: true }
    },

    data(){
        return{
            type: '', // Audio || Record
            src: null,
            pistelement: null,
            audio: null,
            volume: '0.' + parseInt(this.pist.volume),
            currentTime: 0,

            piste: null
        }
    },
    

    mounted(){
        this.initPist()
        this.getPistBuffer()
    },



    methods: {
        initPist: function(){
            if(!this.pist.media){
                console.log('no media must be created in store ');
                this.$store.commit('set_PistParams', {
                    field: 'media',
                    value: null
                })
            }
        },

        createAudio: async function(){
            let pistContainer = document.getElementById("audioContainer-" + this.pist.id)
            
            this.audio  =  document.createElement('audio')
            this.audio.setAttribute('controls', '')
            this.audio.setAttribute('id', 'pist-' + this.pist.id)
            this.audio.setAttribute('src', this.src)
            this.audio.style.backgroundColor = this.pist.color

            let volume = await this.$store.dispatch('get_pistdata', {
                pistid: this.pist.id,
                field: 'volume'
            })
            if(volume > 1) volume = '0.' + parseInt(volume)
            this.audio.volume =   volume
            pistContainer.appendChild(this.audio)

            
        },

        getPistBuffer: function(){
            ApiService.get('/api/pists/' + this.pist.importid, {responseType: 'arraybuffer'}) // Get array buffer of the pist
            .then(({data}) => {
                const blob = new Blob([data], {type: 'audio/mpeg'})
                this.src = URL.createObjectURL(blob);
                this.createAudio(data)
            }).catch(error => console.log(error))
        }
    }
}