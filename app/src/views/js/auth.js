import Login from '../login.vue'
import Register from '../register.vue'


export default{
    components: {
        Login, Register
    },

    data(){
        return{
            on_login: true,
            on_register: false
        }
    },

    methods: {
        switchCard: function(card){
            if(card == 'login'){
                this.on_register = false
                this.on_login = true
            }else{
                this.on_login = false
                this.on_register = true
            }
        }
    }
} 