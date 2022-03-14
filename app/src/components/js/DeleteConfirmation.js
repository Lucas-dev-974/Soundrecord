import api from "../../services/ApiService";

export default{
    props: {
        id:         {required: true},
        url:        {required: true},
        message:    {required: false},
        whatDelete: {required: true}
    },

    data(){
        return {
            dialog: false
        }
    },

    methods: {
        DeleteFunc: function(){
            api.delete(this.url).then(({data}) => {
                console.log(data);
                this.dialog = false
                switch(this.whatDelete){
                    case 'session':
                        this.$store.commit('remove_Session', this.id)
                        break
                    
                    case 'pist':
                        this.$store.commit('remove_PistPlaylist', this.id)
                        break
                }
                
            }).catch(error => {
                console.log(error);
            })
        },


    }
}