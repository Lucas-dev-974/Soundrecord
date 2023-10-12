import  "./Progress.css"

export default {
    props: {
        onInput: {required: true}
    },

    data(){
        return {
            inputRef: null
        }
    },

    mounted(){
        console.log("progress mounted");
        console.log(this.inputRef);
    }
}