<template>
    <div>
        <div v-for="alert in this.$store.state.alerts" :key="alert.id">
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
    </div>
</template>

<script>
export default{
    methods: {
        removeAlert: function(alert){
            alert.open = false
            this.$store.commit('remove_alert', alert.id)
        }
    }
}
</script>
