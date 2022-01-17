import Pist from '../pist.vue'

export default{
    props:{
        imported_pists: {
            required: true
        }
    },

    components: {
        Pist
    },
    
    data(){
        return {
            Recorder: {},
            pists: [],
            volume: 1
        }
    },

    mounted(){
        console.log(this.pists);
    },

    methods:{
    }
}