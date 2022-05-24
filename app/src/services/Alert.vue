<template>
    <div>
        <v-alert elevation='15' :type="alert.type" v-model="alert.open"  transition="scale-transition" style="width: fit-content;" class="mx-auto -10 d-flex align-center">
            <div class="alert-content mr-10">
                <div v-if="Array.isArray(alert.message)">
                    <div v-for="message in alert.message" :key="message">
                        {{message}}
                    </div>
                </div>
                <div v-else>
                    {{alert.message}}
                </div>                       
            </div>
    
            <v-btn color="red" class="ma-0 pa-0" style="right: 5px; position: absolute; top: 10px;"  icon @click="removeAlert(alert)">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-alert>
    </div>
</template>

<script>
export default{
    name: 'alert_service',
    props: {
        alert: {required: true}
    },

    mounted(){
        setTimeout(() => {
            this.$store.commit('remove_alert', this.alert.id)
        }, 10000)
    },

    methods: {
        removeAlert: function(alert){
            alert.open = false
            this.$store.commit('remove_alert', alert.id)
        }
    }
}
</script>
