import  "./Progress.css"

export default {
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