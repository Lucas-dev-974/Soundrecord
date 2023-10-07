import "./SaerchBar.css"

export default {
    data(){
        return {
            entry: ''
        }
    },

    watch: {
        entry: function(){
            console.log(this.entry);
        }
    },

    props: {
        onKeyPressEnter: {required: true},
        placeholder: {required: false}
    },
    
    methods: {
        handleEnter: function(){
            console.log("ok");
            this.onKeyPressEnter(this.entry)
        },

        onChange: function(newval){
            this.entry = newval
        } 
    },
}