<template>
    <div>
        <v-alert elevation='15' :type="alert.type" v-model="alert.open"  transition="scale-transition" style="width:720px " class="mx-auto">
            <v-row >
                <v-col cols="11" >
                    <div  v-if="Array.isArray(alert.message)">
                        <div v-for="message in alert.message" :key="message">
                            {{message}}
                        </div>
                    </div>
                    <div v-else>
                        {{alert.message}}
                    </div>
                </v-col>
                <v-col cols="1"  class="ma-0 pa-0 pt-1">
                    <v-btn color="red"  icon @click="removeAlert(alert)">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-alert>
    </div>
</template>

<script>
export default{
    props: {
        alert: {required: true}
    },

    mounted(){
        console.log('okok');
        setTimeout(() => {
            this.$store.commit('remove_Alert', this.alert.id)
        }, 10000)
    },

    methods: {
        removeAlert: function(alert){
            alert.open = false
            this.$store.commit('remove_Alert', alert.id)
        }
    }
}
</script>
