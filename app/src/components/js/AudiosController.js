import VolumeController from '../VolumeController.vue'
const utils = require('../../utils.js')

export default{
    components: {
        VolumeController
    },

    data(){
        return{
            timeRange: 10,
            g_volume: 100,

            responsive: {
                g_volumeWidth: '200px',
            }

        }
    },

    mounted(){
        
        window.addEventListener('resize', this.handleResize)
    },

    created(){
        this.handleResize()
    },

    methods: {
        handleResize: function(){
            let btnControls = document.getElementsByClassName('button-controls')
            if(this.$store.state.is_mobile){
                this.responsive.g_volumeWidth = '150px !important'
                utils.setClass(btnControls, 'v-size--default', 'v-size--large')

            }else{
                this.responsive.g_volumeWidth = '200px !important'
                utils.setClass(btnControls, 'v-size--large', 'v-size--default')
            }
        },
    }
}