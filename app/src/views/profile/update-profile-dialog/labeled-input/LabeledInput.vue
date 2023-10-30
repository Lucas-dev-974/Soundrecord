<template>
    <div class="labeled-input-container">
        <label for="">{{ label }}</label>
        <input class="input-form dark-mode" type="text" v-model="vmodel" @input="onInput">
    </div>
</template>

<script>
import "./LabeledInput.css"
export default {
    props: {
        label: { required: true },
        setState: { required: true },
        defaultValue: { required: false },
        placeholder: { required: false }
    },

    data() {
        return {
            vmodel: this.defaultValue
        }
    },

    methods: {
        onInput: function () {
            this.setState(this.vmodel)
        }
    }

}
</script>