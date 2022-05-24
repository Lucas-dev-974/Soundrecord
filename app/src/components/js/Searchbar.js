import api from '../../services/ApiService.js'

export default {
    props: {
        add_url:    { required: false },
        item:       { required: true  },
        search_url: { required: false },
        theme:      { required: false }
    },
    
    data(){
        return {
            query: '',
            result: [],
            on_add: false,

            session_name: '',
            params: {},
            page: 0,
            total_page: 0,

            file: null
        }
    }, 

    watch: {
        file: function(){
            this.create()
        },

        query: function(){
            this.search()
        }
    },

    methods: {
        search: async function(){
            api.post(this.search_url, {query: this.query}).then( async ({data}) => {
                if(this.item == 'session'){
                    if(data.totalItems > 0) this.$parent.sessions = data.datas
                    else await this.$parent.GetSessions();
                }else if(this.item == 'pist'){
                    if(data.totalItems > 0) this.$parent.pists = data.datas
                    else await this.$parent.get();
                }

            }).catch(error => {
                console.log(error);
            })
        },

        create: function(){
            if(this.item == 'session'){
                this.$parent.create_session(this.session_name)
            }else if(this.item == 'pist'){
                if(this.file !== null){

                    // Create form to send file
                    let formData = new FormData()
                    formData.append('audio', this.file) // Add file
    
                    // Send request with the form data
                    api.post(this.add_url, formData).then(({data}) => {
                        console.log(data);
                        this.$parent.pists.push({
                            id: data.id,
                            name: data.name
                        })
                    }).catch(error => {
                        console.log(error);
                    })
                }
            }else{
                console.log();
            }
        },

        paginate: async function(state){
            if(state == 'next-page'){
                if(this.page < this.total_page)
                    this.page += 1
            }else if(state == 'previous-page'){
                if(this.page > 0) this.page -= 1
            }

            if(this.item == 'session'){
                this.total_page = await this.$parent.get_sessions(this.page)
            }else if(this.item == 'pist'){
                this.total_page = await this.$parent.get(this.page) 
            }else if(this.item == 'creator'){
                let parent = this.$parent.$parent.$parent;
                this.total_page = await parent.get_artists(this.page)
            }
        }
    }
}