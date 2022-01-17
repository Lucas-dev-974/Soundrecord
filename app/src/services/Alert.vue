<template>
    <div>
        <div v-for="alert in alerts" :key="alert.id">
            <v-alert type="warning" v-model="alert.open"  transition="scale-transition" style="width: fit-content; ">
                <v-row >
                    <v-col cols="11" style="padding: 0 !important">
                        <div  v-if="Array.isArray(alert.message)">
                            <div  v-for="message in alert.message" :key="message">
                                {{message}}
                            </div>
                        </div>
                        <div v-else>
                            {{alert.message}}
                        </div>
                    </v-col>
                    <v-col cols="1"  style="padding: 0 !important">
                        <v-btn color="red"  icon @click="removeAlert(alert)">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-alert>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            alerts: this.$store.state.alerts,
        }
    },

    methods: {
        removeAlert: function(alert){
            console.log(alert);
            alert.open = false
            this.$store.commit('remove_alert', alert.id)
        }
    }
}
</script>
