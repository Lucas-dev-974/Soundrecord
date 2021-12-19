<template>
    <div class="d-flex  " >
        <v-slider v-model="value" step="0" max=100 prepend-icon="mdi-volume-high"></v-slider>
    </div>
</template>

<script>
export default{
    data(){
        return{
            value: 10
        }
    }
}
</script>
