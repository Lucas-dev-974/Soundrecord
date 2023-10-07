import "./GenreTag.css"

export default {
    props: {
        text: { required: true },
        onClick: {required: false}
    },

    methods: {
        clickHandler: function(){
            if(this.onClick){
                this.onClick()
            }else{
                // todo : make  action to search audio with the current tag
                console.log("Todo");
            }
        }
    }
}