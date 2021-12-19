export default{
    name: 'pist',

    props:{
        currentTime:{required: true},
        audio: {required: true}
    },

    data(){
        return{
            type: '', // Audio || Record
        }
    },

    watch: {
    },

    mounted(){
    },

    methods: {

    }
}