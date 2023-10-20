<template>
    <div class="input-form">
        <input class="input" type="text" v-model="input" v-on:input="onInputHandler" :placeholder="placeholder">
    </div>
</template>

<script>
import "./SaerchBar.css"

export default {
    props: {
        placeholder: { required: false },
        onInput: { required: true }
    },
    data() {
        return { input: '' }
    },
    methods: {
        onInputHandler: function () {
            this.onInput(this.input)
        }
    },
}
</script>